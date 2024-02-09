package fib.asw.waslab03;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

import org.apache.hc.client5.http.fluent.Request;
import org.apache.hc.core5.http.ContentType;
import org.json.JSONArray;
import org.json.JSONObject;
import org.json.XML;

public class Tasca_5 {
	
	private static final String LOCALE = "ca";
	

	public static void main(String[] args) {

		JSONObject body = new JSONObject();
		body.put("id", "109953247973576208");
		body.put("language", LOCALE);
		String id = "109953247973576208";

		String URI = "https://mastodont.cat/api/v1/statuses/"+id;
		String URI0 = "https://mastodont.cat/api/v1/accounts/109862447110628983/statuses";
		String TOKEN = Token.get();

		try {
			String output0 = Request.get(URI0)
					.bodyString(body.toString(), ContentType.parse("application/json"))
					.addHeader("Authorization","Bearer "+TOKEN)
					.execute()
					.returnContent()
					.asString();
			
			JSONArray array = new JSONArray(output0);
			JSONObject result = (JSONObject) array.get(0);
	        
			String xml = (String) result.getString("content");
			
			JSONObject json = XML.toJSONObject(xml);
	        System.out.println(json.getJSONObject("p").get("content")); 
			
			
			String uri = "https://mastodont.cat/api/v1/statuses/"+result.getString("id")+"/reblog";
			
			String output2 = Request.post(uri)
					.bodyString(body.toString(), ContentType.parse("application/json"))
					.addHeader("Authorization","Bearer "+TOKEN)
					.execute()
					.returnContent()
					.asString();

		}
		catch (Exception ex) {
			ex.printStackTrace();
		}
	}

}
