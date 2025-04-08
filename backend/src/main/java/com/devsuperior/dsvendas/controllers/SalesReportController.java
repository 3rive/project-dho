package com.devsuperior.dsvendas.controllers;

import com.devsuperior.dsvendas.services.SalesReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/reports/sales")
public class SalesReportController {

    @Autowired
    private SalesReportService salesReportService;

    @GetMapping("/pdf")
    public ResponseEntity<byte[]> downloadSalesReport() {
        try {
            System.out.println("Before Report Generation");
            byte[] report = salesReportService.generateSalesReport();
            System.out.println("After Report Generation");
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=sales_report.pdf")
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(report);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }
}