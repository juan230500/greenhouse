#include <ESP8266HTTPClient.h>
#include <ESP8266WiFi.h>
#include <ArduinoJson.h>
#include <DHT.h>

#define DHTPIN 14
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);
 
void setup() {
 
  Serial.begin(9600);                                  //Serial connection
  WiFi.begin("Alva", "Telememo");   //WiFi connection
 
  while (WiFi.status() != WL_CONNECTED) {  //Wait for the WiFI connection completion
 
    delay(1000);
    Serial.println("Waiting for connection");
 
  }

  dht.begin();
 
}
 
void loop() {
 
 if(WiFi.status()== WL_CONNECTED){   //Check WiFi connection status

  float h = dht.readHumidity();
  float t = dht.readTemperature();

  DynamicJsonDocument doc(1024);

  doc["temperature"] = t;
  doc["humidity"]   = h;
  String jsonData;
  serializeJson(doc, jsonData);
  Serial.println(jsonData);
 
   HTTPClient http;    //Declare object of class HTTPClient
 
   http.begin("http://ec2-54-166-144-31.compute-1.amazonaws.com:3000/greenhouse");      //Specify request destination
   http.addHeader("Content-Type", "application/json");  //Specify content-type header
   http.addHeader("Authorization", "");
 
   int httpCode = http.POST(jsonData);   //Send the request
   String payload = http.getString();                //Get the response payload
 
   Serial.println(httpCode);   //Print HTTP return code
   Serial.println(payload);    //Print request response payload
 
   http.end();  //Close connection
 
 }else{
 
    Serial.println("Error in WiFi connection");   
 
 }
 
  delay(10*60*1000);
 
}
