package com.rfc.WeatherApp.controller;

import com.rfc.WeatherApp.DZO.ForeCast;
import com.rfc.WeatherApp.DZO.Root;
import com.rfc.WeatherApp.DZO.WeatherResponse;
import com.rfc.WeatherApp.service.Weatherservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/weather")
@CrossOrigin(origins = "*")
public class Wcontroller {
    @Autowired
    public Weatherservice service;
    @GetMapping("/{city}")
    public WeatherResponse getdata(@PathVariable String city){
        return service.getdata(city);
    }
    @GetMapping("/forecast")
    public ForeCast getForeCast(@RequestParam String city,@RequestParam int days){
        return service.getForecast(city,days);
    }
}
