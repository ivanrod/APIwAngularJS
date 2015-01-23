module StaticPagesHelper
	@base_url = "http://54.213.202.156:8080/middleware/rs/API/company/5/"
	@username = "admin.ecare@altran.com"
	@password = "Orange1"

	#Parse JSON if it is longer than 2 octals
	def self.parse_data(data)
		if data && data.length >= 2
			JSON.parse(data)
		else
			data
		end
	end

	#Calls to Play server
	def self.call(url)
    uri2= URI.parse(@base_url + url)
    request = Net::HTTP::Get.new uri2
    http = Net::HTTP.new(uri2.host, uri2.port)
    request["Username"] = @username
    request["Password"] = @password
    response = http.request request

  	response_body = parse_data(response.body)			
	end

	def self.group_call
		call("groups")
	end

	def self.assets_call
		call("assets")
	end

	def self.total_payloads_call
		call("totalPayloads")
	end
end
