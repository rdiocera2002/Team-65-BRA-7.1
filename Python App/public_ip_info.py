import requests
import re

def is_valid_ip(ip):

    pattern = re.compile(r'^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$|^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$')
    return pattern.match(ip) is not None

def get_ip_info(ip):
    try:
        response = requests.get("https://ipapi.co/json")
        response.raise_for_status()

        data = response.json()
        
        ip = data.get("ip", "N/A")
        city = data.get("city", "N/A")
        region = data.get("region", "N/A")
        country = data.get("country", "N/A")
        org = data.get("org", "N/A")
        ip_type = "IPv4" if '.' in ip else "IPv6"
        time_zone = data.get("timezone", "N/A")

        print(f"Public IP Address         : {ip}")
        print(f"IP Address Type           : {ip_type}")
        print(f"Location                  : {city}, {region}, {country}")
        print(f"Internet Service Provider : {org}")
        print(f"Time Zone                 : {time_zone}")
        
    except requests.RequestException as e:
        print(f"Error: Failed to fetch IP information: {e}")

def get_public_ip_info():
    """Fetch information for the public IP address."""
    try:
        response = requests.get("https://ipapi.co/json")
        response.raise_for_status()

        data = response.json()
        ip = data.get("ip", "N/A")
        get_ip_info(ip)

    except requests.RequestException as e:
        print(f"Error: Failed to fetch IP information: {e}")

if __name__ == "__main__":
    user_choice = input("Do you want to see your public IP information (y/n)? ").strip().lower()
    if user_choice == 'y':
        get_public_ip_info()
    else:
        ip_input = input("Enter the IP address you want to look up: ").strip()
        if is_valid_ip(ip_input):
            get_ip_info(ip_input)
        else:
            print("Invalid IP Address Format")
