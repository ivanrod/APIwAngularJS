module StaticPagesHelper
	domain_data = JSON.parse(IO.read(Rails.root.to_s+"/play_credentials.json"))
	@base_url = domain_data['url']
	@base_url_post = domain_data['url_post']
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



	#Parse Payloads
	def self.parse_location(lat,lon)
		return lat.to_s + ", " + lon.to_s
	end

	def self.parse_payload_location(asset_id, lat, lon, distance)
		return {"id"=> asset_id, "data"=>{"location"=> parse_location(lat,lon), "distanceToHome"=>distance}}
	end

	#Post to Play server
	#x=StaticPagesHelper::parse_payload_location("Pulsera_001",41.358168,2.102503)
	def self.post(data)
    uri = URI.parse(@base_url_post)
		https = Net::HTTP.new(uri.host,uri.port)
		#https.use_ssl = true
		req = Net::HTTP::Post.new(uri.path, initheader = {'Content-Type' =>'application/json'})
		req["Username"] = @username
		req["Password"] = @password
		req.body = data.to_json
		res = https.request(req)
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

	def self.asset_alerts_call(asset_id, start_date, end_date)
		call("asset/" + asset_id + '/alerts/' + start_date.to_s + "/" + end_date.to_s)
	end

	#Specific calls

	def self.asset_payloads_last_7days(asset_id)
		start_date = (Time.now-(7*24*3600)).to_i*1000
		end_date = Time.now.to_i*1000
		asset_payloads_call(asset_id, start_date, end_date)
	end

	def self.asset_alerts_last_7days(asset_id)
		start_date = (Time.now-(7*24*3600)).to_i*1000
		end_date = Time.now.to_i*1000
		asset_alerts_call(asset_id, start_date, end_date)
	end	

	def self.get_groups_alerts_last_7days(groups)
		users = []
		n = 0
		groups.each do |group|
			users.push({"userId" => group["name"]})
			group["assets"].each do |asset|
				users[n]["alerts"]=asset_alerts_last_7days(asset["assetId"])
			end
			n =+ 1
		end

		return users
	end


	
end
