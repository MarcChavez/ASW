package asw01cs;


import org.apache.http.client.fluent.Form;
import org.apache.http.client.fluent.Request;
//This code uses the Fluent API

public class SimpleFluentClient {

	private static String URI = "http://localhost:8080/waslab01_ss/";

	public final static void main(String[] args) throws Exception {
    	
    	/* Insert code for Task #4 here */
		String idTw = Request.Post(URI).bodyForm(Form.form().add("author",  "lluis").add("tweet_text",  "secret").build()).addHeader("Accept", "text/plain").execute().returnContent().asString();
    	
		idTw = idTw.substring(0, idTw.length()-1);
		
    	/* Insert code for Task #5 here */
    	 Request.Post(URI)
    	 .bodyForm(Form.form().add("idTweet", idTw).build())
    	 .addHeader("Accept", "text/plain").execute().returnContent().asString();
    	 
    	 System.out.println(Request.Get(URI).addHeader("Accept","text/plain").execute().returnContent());
    	  
    	  
    	  
 
    }
}

