package com.rfc.WeatherApp.service;

import com.rfc.WeatherApp.DZO.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
public class Weatherservice {
    @Value("${weather.api.key}")
    private String apiKey;
    @Value("${weather.api.url}")
    private String apiUrl;
    @Value("${weather.api.forecast.url}")
    private String apiforecastUrl;
    private RestTemplate template=new RestTemplate();
    public String test(){
        return "Good";
    }

    public WeatherResponse getdata(String city){
        String url=apiUrl+"?key="+apiKey+"&q="+city;
        Root response=template.getForObject(url, Root.class);
        WeatherResponse weatherResponse=new WeatherResponse();
        String c=response.getLocation().name;
        String region=response.getLocation().region;
        String country=response.getLocation().country;
        weatherResponse.setCity(c);
        weatherResponse.setRegion(region);
        weatherResponse.setCountry(country);
        String condition=response.getCurrent().getCondition().getText();
        weatherResponse.setCondition(condition);
        weatherResponse.setTemp(response.getCurrent().getTemp_c());
        return weatherResponse;
    }


    public ForeCast getForecast(String city,int days){
        ForeCast weatherforeCast=new ForeCast();
        WeatherResponse weatherResponse =getdata(city);
        ForeCast response=new ForeCast();
        response.setWeatherResponse(weatherResponse);
        List<DayTemp> daylist=new ArrayList<>();

        String url=apiforecastUrl+"?key="+apiKey+"&q="+city+"&days="+days;
        Root apires=template.getForObject(url, Root.class);
        ForeCast2 forecast=apires.getForecast();
        ArrayList<Forecastday> forcastday=forecast.getForecastday();
        for(Forecastday arrforcast:forcastday){
            DayTemp d=new DayTemp();
            d.setDate(arrforcast.getDate());
            d.setMintemp(arrforcast.day.getMintemp_c());
            d.setAvgtemp(arrforcast.day.getAvgtemp_c());
            d.setMaxtemp(arrforcast.day.getMaxtemp_c());
            daylist.add(d);
        }
        response.setDayTemp(daylist);
        return response;
    }
}
