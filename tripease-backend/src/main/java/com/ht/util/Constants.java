package com.ht.util;


public class Constants {
    public static final String API_BASE_PATH = "/api";
    public static final String AUTH_PATH = API_BASE_PATH + "/auth";
    public static final String TRIPS_PATH = API_BASE_PATH + "/trips";
    public static final String EXPENSES_PATH = API_BASE_PATH + "/expenses";
    public static final String DASHBOARD_PATH = API_BASE_PATH + "/dashboard";
    public static final String AI_PATH = API_BASE_PATH + "/ai";
    
    public static final String DEFAULT_PAGE_SIZE = "10";
    public static final String DEFAULT_PAGE_NUMBER = "0";
    
    private Constants() {
        // Private constructor to prevent instantiation
    }
}