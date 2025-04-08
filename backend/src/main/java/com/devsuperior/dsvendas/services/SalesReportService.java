package com.devsuperior.dsvendas.services;

import com.devsuperior.dsvendas.entities.Sale;
import com.devsuperior.dsvendas.repositories.SaleRepository;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class SalesReportService {

    @Autowired
    private SaleRepository saleRepository;

    public byte[] generateSalesReport() throws Exception {
        // Fetch sales data
        List<Sale> sales = saleRepository.findAll();

        // Compile the Jasper report
        JasperReport jasperReport = JasperCompileManager.compileReport(
                getClass().getResourceAsStream("/reports/Cherry.jrxml")
        );

        // Create a data source for the report
        JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(sales);

        // Add parameters (if needed)
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("ReportTitle", "Sales Report");

        // Fill the report
        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);

        // Export the report to a PDF
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        JasperExportManager.exportReportToPdfStream(jasperPrint, outputStream);

        return outputStream.toByteArray();
    }
}