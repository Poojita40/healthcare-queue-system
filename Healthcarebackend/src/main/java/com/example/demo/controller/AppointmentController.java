package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import com.example.demo.model.Appointment;
import com.example.demo.service.AppointmentService;
import com.example.demo.dto.AppointmentResponse;

@RestController
@RequestMapping("/appointments")
@CrossOrigin(origins = "*")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    // 🔹 Book Appointment
    @PostMapping("/book")
    public AppointmentResponse bookAppointment(
            @RequestParam Long patientId,
            @RequestParam Long doctorId,
            @RequestParam String date,
            @RequestParam String time,
            @RequestParam String problem) {

        Appointment appointment =
                appointmentService.bookAppointment(patientId, doctorId, date, time, problem);

        return appointmentService.convertToResponse(appointment);
    }

    // 🔹 Get All Appointments
    @GetMapping
    public List<Appointment> getAllAppointments() {
        return appointmentService.getAllAppointments();
    }

    // 🔹 Get Doctor Queue
    @GetMapping("/queue")
    public List<Appointment> getDoctorQueue(
            @RequestParam Long doctorId,
            @RequestParam String date) {

        return appointmentService.getDoctorQueue(doctorId, date);
    }

    // 🔹 Get Next Patient
    @GetMapping("/next")
    public Appointment getNextPatient(
            @RequestParam Long doctorId,
            @RequestParam String date) {

        return appointmentService.getNextPatient(doctorId, date);
    }

    // ⭐ Cancel Appointment
    @DeleteMapping("/{id}")
    public ResponseEntity<String> cancelAppointment(@PathVariable Long id) {

        String result = appointmentService.cancelAppointment(id);

        if (result.equals("Appointment not found")) {
            return ResponseEntity.status(404).body(result);
        }

        return ResponseEntity.ok(result);
    }

    // ⭐ Get Queue with Estimated Waiting Time
    @GetMapping("/waiting-time")
    public List<String> getQueueWithWaitingTime(
            @RequestParam Long doctorId,
            @RequestParam String date) {

        return appointmentService.getQueueWithWaitingTime(doctorId, date);
    }
}