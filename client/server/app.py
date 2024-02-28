from flask import Flask, request, jsonify
from flask_mail import Mail, Message
from flask_cors import CORS
from dotenv import load_dotenv
import os




load_dotenv() 
app = Flask(__name__)
database_url = os.environ.get('DATABASE_URL')
# Configuration for Flask-Mail
app.config['MAIL_SERVER'] = os.getenv('MAIL_SERVER')
app.config['MAIL_PORT'] = int(os.getenv('MAIL_PORT'))
app.config['MAIL_USE_TLS'] = os.getenv('MAIL_USE_TLS').lower() == 'true'
app.config['MAIL_USE_SSL'] = os.getenv('MAIL_USE_SSL').lower() == 'true'
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
app.config['MAIL_DEFAULT_SENDER'] = os.getenv('MAIL_DEFAULT_SENDER')

mail = Mail(app)

CORS(app)

@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'POST':
        # Handle POST request logic here
        return jsonify({'message': 'Received POST request at the root URL'}), 200
    else:
        return jsonify({'message': 'Welcome to Sophisticated Moves!'}), 200

@app.route('/send-quote', methods=['POST'])
def send_quote():
    try:
        data = request.get_json()

        # Extract data from the request
        name = data.get('name')
        email = data.get('email')
        phone = data.get('phone')
        estimated_total = data.get('estimatedTotal')


        if not name or not email or not estimated_total:
            return jsonify({'message': 'Missing required fields'}), 400

        # Send email to the user
        send_email(email, f"Your Moving Quote for {name}", f"Your estimated total is: ${estimated_total}")

        # Send email to your email (replace 'your_email' with your actual email)
        send_email('Sophisticatedelitemoves@gmail.com', f"New Moving Quote Request from {name}", f"Customer's email: {email}\nEstimated total: ${estimated_total} \nPhone: {phone}")

        return jsonify({'message': 'Quote request sent successfully'}), 200

    except Exception as e:
        print(f"Error sending quote: {e}")
        return jsonify({'message': 'Failed to send quote request'}), 500

@app.route('/send-email', methods=['POST'])
def send_email(to, subject, body):
    try:
        msg = Message(subject, sender='Sophisticatedelitemoves@gmail.com', recipients=[to])
        msg.body = body
        mail.send(msg)
        print(f"Email sent to {to} successfully.")
    except Exception as e:
        print(f"Error sending email: {e}")

if __name__ == "__main__":
    app.run(host="localhost", port=5000, debug=True)
