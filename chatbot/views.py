from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from openai import OpenAI
import json

client = OpenAI(api_key=settings.OPENAI_API_KEY)

@csrf_exempt
def chat_view(request):
    if request.method == "POST":
        data = json.loads(request.body)
        user_input = data.get("message")

        if user_input:
            response = client.chat.completions.create(
                model="gpt-4.1", 
                messages=[
                    {"role": "system", "content": "You are a helpful assistant on a job board website."},
                    {"role": "user", "content": user_input}
                ]
            )
            reply = response.choices[0].message.content.strip()
            return JsonResponse({"response": reply})
        
    return JsonResponse({"response": "Sorry, I didn't understand that."})