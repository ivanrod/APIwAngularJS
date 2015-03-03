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

	#Random functions
	#The greater the distance_number, the greater distance
	def self.random_location(start_location_lat, start_location_lon, distance_number)
		new_location = {}
		new_location["lat"] = start_location_lat + rand(distance_number)/30000.0
		new_location["lon"] = start_location_lon + rand(distance_number)/30000.0
		new_location["distance"] = random_distance(start_location_lat, new_location["lat"], start_location_lon, new_location["lon"])
	
		return new_location
	end

	def self.random_distance(old_location_lat, new_location_lat, old_location_lon, new_location_lon)
		old_location = GeoUtm::LatLon.new old_location_lat, old_location_lon
		new_location = GeoUtm::LatLon.new new_location_lat, new_location_lon
		old_location = old_location.to_utm
		new_location = new_location.to_utm 
		distance = Math::sqrt((new_location.e-old_location.e)**2 + (new_location.n-old_location.n)**2)
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

	def self.send_location_payloads_interval(asset_id, interval)
		timers = Timers::Group.new
		every_interval_seconds = timers.every(interval) { 
			random_loc = random_location(41.358168, 2.102503, 1000)
			new_post = post(parse_payload_location(asset_id, 
				random_loc["lat"], 
				random_loc["lon"], 
				random_loc["distance"])) 
			puts "Enviando payload..." 
			puts new_post
		}
		loop { timers.wait }

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

	def self.asset_latest_payloads_call(asset_id, payloads_num)
		call("asset/" + asset_id + "/latestPayloads/" + payloads_num.to_s)
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
		groups.each_with_index do |group, index|
			users.push({"userId" => group["name"]})
			users[index]["alerts"] = []
			group["assets"].each do |asset|
				users[index]["alerts"].concat asset_alerts_last_7days(asset["assetId"])
			end
			
		end

		return users
	end

	def self.get_groups_latest_payloads(groups, payloads_num)
		users = []
		groups.each_with_index do |group, index|
			users.push({"userId" => group["name"]})
			users[index]["payloads"] = []
			group["assets"].each do |asset|
				users[index]["payloads"].concat asset_latest_payloads_call(asset["assetId"], payloads_num)
			end
		end

		return users		
	end


	#NOT IMPLEMENTED IN JAVA

	def self.get_group_assets(group_name)
		call("group/" + group_name)
	end


	def self.get_group_assets_names(group_name)
		assets_names = []
		group_assets = get_group_assets(group_name)
		
		group_assets['assets'].each do |asset|
			assets_names.push(asset['assetId'])
		end

		return assets_names
	end

	def self.get_all_asset_alerts(asset_id)
		start_date = 0
		end_date = Time.now.to_i*1000 
		return asset_alerts_call(asset_id, start_date, end_date)
	end

	def self.get_all_group_alerts(group_name)
		alerts = []
		assets_names = get_group_assets_names(group_name)
		assets_names.each do |asset_name|
			alerts.concat get_all_asset_alerts(asset_name)
		end

		return alerts
	end


#EN  CUANTO HAY HAYA ALERTAS (CAIDAS,..) EL ULTIMO PAYLOAD NO TIENE POR QUE LLEVAR LOCATION??, POR TANTO PODRIA HABER QUE IMPLEMENTAR OTRA FUNCIÓN QUE BUSCASE EL ULTIMO PAYLOAD CON POSICION
	def self.get_latest_group_payload(group_name)
		payload = []
		asset_names = get_group_assets_names(group_name)
		asset_names.each do |asset|
			new_payload = asset_latest_payloads_call(asset, 1)
			if new_payload != [] && new_payload[0]['data'] != nil
				payload = new_payload
			end
		end

		return payload
	end

	def self.get_group_data_from_my_db(groups)
		groups.each do |group|
			if Elder.find_by_userId(group["name"]) != nil
				group["dbName"] = Elder.find_by_userId(group["name"])["name"]
				group["address"] = Elder.find_by_userId(group["name"])["address"]
				group["phone"] = Elder.find_by_userId(group["name"])["phone"]
			end
		end 
		return groups
	end




	
end
