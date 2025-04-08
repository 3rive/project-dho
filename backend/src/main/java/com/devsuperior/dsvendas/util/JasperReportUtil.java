package com.devsuperior.dsvendas.util;

import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperReport;

import java.io.InputStream;

public class JasperReportUtil {

    public static JasperReport compileReport(String reportPath) throws Exception {
        InputStream reportStream = JasperReportUtil.class.getResourceAsStream(reportPath);
        if (reportStream == null) {
            throw new RuntimeException("Report file not found: " + reportPath);
        }
        return JasperCompileManager.compileReport(reportStream);
    }
}