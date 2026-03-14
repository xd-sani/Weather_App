package com.rfc.WeatherApp.DZO;

import java.time.LocalDate;

public class DayTemp {
    private String date;
    private Double mintemp;
    private Double maxtemp;
    private Double avgtemp;

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Double getMintemp() {
        return mintemp;
    }

    public void setMintemp(Double mintemp) {
        this.mintemp = mintemp;
    }

    public Double getMaxtemp() {
        return maxtemp;
    }

    public void setMaxtemp(Double maxtemp) {
        this.maxtemp = maxtemp;
    }

    public Double getAvgtemp() {
        return avgtemp;
    }

    public void setAvgtemp(Double avgtemp) {
        this.avgtemp = avgtemp;
    }
}
