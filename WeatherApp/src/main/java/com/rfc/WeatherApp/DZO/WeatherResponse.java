package com.rfc.WeatherApp.DZO;

public class WeatherResponse {
    private String city;
    private String region;
    private String country;
    private String condition;
    private Double temp;

    public WeatherResponse() {
    }

    public WeatherResponse(String city, String region, String country, String condition, Double temp) {
        this.city = city;
        this.region = region;
        this.country = country;
        this.condition = condition;
        this.temp = temp;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getCondition() {
        return condition;
    }

    public void setCondition(String condition) {
        this.condition = condition;
    }

    public Double getTemp() {
        return temp;
    }

    public void setTemp(Double temp) {
        this.temp = temp;
    }
}
