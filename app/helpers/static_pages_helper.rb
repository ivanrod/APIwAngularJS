module StaticPagesHelper
	domain_data = JSON.parse(IO.read(Rails.root.to_s+"/play_credentials.json"))
	@base_url = domain_data['url']
	@username = domain_data['Username']
	@password = domain_data['Password']


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

	def self.families_call
		call("families")
	end

	def self.family_call(family_name)
		call("family/" + family_name)
	end

	def self.family_assets_call(family_name)
		call("family/" + family_name + "/assets")
	end

	def self.family_payloads_call(family_name)
		call("family/" + family_name + "/payloads")
	end

	def self.family_rules_call(family_name)
		call("family/" + family_name + "/rules")
	end

	def self.groups_call
		call("groups")
	end

	def self.assets_call
		call("assets")
	end

	def self.asset_payloads_call(asset_id, start_date, end_date)
		call("asset/" + asset_id + '/payloads/' + start_date + "/" + end_date)
	end

	def self.total_payloads_call
		call("totalPayloads")
	end
	
end
