package com.example.demo.service;

import java.util.List;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.*;
import com.example.demo.repository.*;
import com.example.demo.dto.AppointmentResponse;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    // 🔹 Book Appointment
    public Appointment bookAppointment(Long patientId,
                                       Long doctorId,
                                       String date,
                                       String time,
                                       String problem) {

        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        if (!doctor.isAvailable()) {
            throw new RuntimeException("Doctor not available");
        }

        boolean alreadyBooked =
                appointmentRepository.existsByDoctorIdAndAppointmentDateAndAppointmentTime(
                        doctorId, date, time);

        if (alreadyBooked) {
            throw new RuntimeException("Time slot already booked");
        }

        List<Appointment> existing =
                appointmentRepository.findByDoctorIdAndAppointmentDate(doctorId, date);

        int queueNumber = existing.size() + 1;

        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        Appointment appointment = new Appointment();
        appointment.setAppointmentDate(date);
        appointment.setAppointmentTime(time);
        appointment.setProblem(problem);
        appointment.setQueueNumber(queueNumber);
        appointment.setStatus("BOOKED");
        appointment.setPatient(patient);
        appointment.setDoctor(doctor);

        return appointmentRepository.save(appointment);
    }

    // 🔹 Convert Entity → DTO
    public AppointmentResponse convertToResponse(Appointment appointment) {

        return new AppointmentResponse(
                appointment.getPatient().getId(),
                appointment.getPatient().getName(),
                appointment.getDoctor().getId(),
                appointment.getDoctor().getName(),
                appointment.getProblem(),
                appointment.getAppointmentDate(),
                appointment.getAppointmentTime(),
                appointment.getQueueNumber(),
                appointment.getStatus()
        );
    }

    // 🔹 Get All Appointments
    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    // 🔹 Get Doctor Queue
    public List<Appointment> getDoctorQueue(Long doctorId, String date) {
        return appointmentRepository
                .findByDoctorIdAndAppointmentDateOrderByQueueNumberAsc(doctorId, date);
    }

    // 🔹 Get Next Patient
    public Appointment getNextPatient(Long doctorId, String date) {

        Appointment nextPatient =
                appointmentRepository.findFirstByDoctorIdAndAppointmentDateOrderByQueueNumberAsc(
                        doctorId, date);

        if (nextPatient == null) {
            throw new RuntimeException("No patients in queue");
        }

        return nextPatient;
    }

    // ⭐ Cancel Appointment with Queue Reordering
    public String cancelAppointment(Long appointmentId) {

        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElse(null);

        if (appointment == null) {
            return "Appointment not found";
        }

        Long doctorId = appointment.getDoctor().getId();
        String date = appointment.getAppointmentDate();
        int cancelledQueue = appointment.getQueueNumber();

        appointmentRepository.delete(appointment);

        List<Appointment> remaining =
                appointmentRepository.findByDoctorIdAndAppointmentDateOrderByQueueNumberAsc(
                        doctorId, date);

        for (Appointment a : remaining) {
            if (a.getQueueNumber() > cancelledQueue) {
                a.setQueueNumber(a.getQueueNumber() - 1);
                appointmentRepository.save(a);
            }
        }

        return "Appointment cancelled and queue updated";
    }

    // ⭐ Get Queue with Estimated Waiting Time
    public List<String> getQueueWithWaitingTime(Long doctorId, String date) {

        List<Appointment> queue =
                appointmentRepository.findByDoctorIdAndAppointmentDateOrderByQueueNumberAsc(
                        doctorId, date);

        List<String> result = new ArrayList<>();

        int consultationTime = 10; // minutes per patient

        for (Appointment a : queue) {

            int waitingTime = (a.getQueueNumber() - 1) * consultationTime;

            String info = "Queue " + a.getQueueNumber()
                    + " - Patient: " + a.getPatient().getName()
                    + " - Waiting Time: " + waitingTime + " minutes";

            result.add(info);
        }

        return result;
    }
}