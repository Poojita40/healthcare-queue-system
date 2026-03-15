package com.example.demo.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.model.Appointment;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    // For queue generation
    List<Appointment> findByDoctorIdAndAppointmentDate(Long doctorId, String appointmentDate);

    // Prevent double booking
    boolean existsByDoctorIdAndAppointmentDateAndAppointmentTime(
            Long doctorId, String appointmentDate, String appointmentTime);

    // Find appointments by doctor
    List<Appointment> findByDoctorId(Long doctorId);

    // Find appointments by patient
    List<Appointment> findByPatientId(Long patientId);

    // Get doctor queue ordered by queue number
    List<Appointment> findByDoctorIdAndAppointmentDateOrderByQueueNumberAsc(
            Long doctorId, String appointmentDate);

    // ⭐ Get next patient in queue
    Appointment findFirstByDoctorIdAndAppointmentDateOrderByQueueNumberAsc(
            Long doctorId, String appointmentDate);
}