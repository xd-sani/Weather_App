package com.rfc.WeatherApp.DZO;

public class Root {

    private Location location;
    private Current current;
    private ForeCast2 forecast;

    public Root() {}   // very important for JSON mapping

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public Current getCurrent() {
        return current;
    }

    public void setCurrent(Current current) {
        this.current = current;
    }

    public ForeCast2 getForecast() {   // FIXED
        return forecast;
    }

    public void setForecast(ForeCast2 forecast) {  // FIXED
        this.forecast = forecast;
    }
}