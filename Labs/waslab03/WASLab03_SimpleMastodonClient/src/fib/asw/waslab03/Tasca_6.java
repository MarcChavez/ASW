package fib.asw.waslab03;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

import org.apache.hc.client5.http.fluent.Request;
import org.apache.hc.core5.http.ContentType;
import org.json.JSONArray;
import org.json.JSONObject;
import org.json.XML;

public class Tasca_6 {
	
	private static final String LOCALE = "ca";

	public static void main(String[] args) {

		JSONObject body = new JSONObject();
		
		SimpleDateFormat sdf = new SimpleDateFormat("EEEE, dd MMMM 'de' yyyy 'a les' HH:mm:ss", new Locale(LOCALE));
		String now = sdf.format(new Date());

		String URI = "https://mastodont.cat/api/v1/trends/tags";
		
		String TOKEN = Token.get();

		try {
			String output0 = Request.get(URI)
					.bodyString(body.toString(), ContentType.parse("application/json"))
					.addHeader("Authorization","Bearer "+TOKEN)
					.execute()
					.returnContent()
					.asString();
			
			System.out.println("Els 10 tags més populars a Mastodon"+now); 
			
	        for (int x = 0; x < 10; ++x)
	        {
	        	JSONArray array = new JSONArray(output0);
				JSONObject result = (JSONObject) array.get(x);
				
		        System.out.println("*************************************************");
		        System.out.println("* Tag: "+ result.getString("name"));
		        System.out.println("*************************************************");
		        
		        String URI2 = "https://mastodont.cat/api/v1/timelines/tag/"+result.getString("name")+"?limit=5";
		        
		        JSONObject body2 = new JSONObject();
				body2.put("hashtag", result.getString("name"));
				body2.put("limit", 5);
				body2.put("language", LOCALE);
				
				String output1 = Request.get(URI2)
						.bodyString(body2.toString(), ContentType.parse("application/json"))
						.addHeader("Authorization","Bearer "+TOKEN)
						.execute()
						.returnContent()
						.asString();
				
				JSONArray array2 = new JSONArray(output1);
				for (int y = 0; y < array2.length(); ++y)
				{
					
					JSONObject result2 = (JSONObject) array2.get(y);
					String id = result2.getString("id");
					
					String URI3 = "https://mastodont.cat/api/v1/statuses/"+id;
					JSONObject body3 = new JSONObject();
					body.put("id", id);
					
					String output3 = Request.get(URI3)
							.bodyString(body3.toString(), ContentType.parse("application/json"))
							.addHeader("Authorization","Bearer "+TOKEN)
							.execute()
							.returnContent()
							.asString();
					
					
					JSONObject result3 = new JSONObject(output3);
					
					System.out.print("- ");
					System.out.print(result3.getJSONObject("account").getString("display_name") + " ");
					System.out.print("("+result3.getJSONObject("account").getString("username"));
					System.out.print("@"+result3.getJSONObject("account").getString("acct") + "): ");
					
					System.out.print(result3.get("content").toString().replaceAll("\\<.*?\\>", ""));
					System.out.println("-------------------------------------------------");

			        
					//- Frankie (@frankiespurlock@mastodon.world): “Keep the change, you filthy animal” #ThrowBackThursday
					//System.out.println(array1);
					//JSONObject json = XML.toJSONObject(xml);
					//System.out.println(json.getJSONObject("p").get("id")); 
					
					
					
				}
				
		       
	        }
			


		}
		catch (Exception ex) {
			ex.printStackTrace();
		}
	}

}
