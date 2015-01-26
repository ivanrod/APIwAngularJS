class StaticPagesController < ApplicationController
	layout 'nav_amt'
	
  def home
  	@specific_js = ["Chart.min.js"]

  	start_date = Time.parse("2015-01-01 00:00").to_i*1000
  	end_date = Time.parse("2015-01-31 00:00").to_i*1000

  	#@response_body = StaticPagesHelper::asset_payloads_call("Pulsera_001", start_date.to_s, end_date.to_s)
  	gon.response = StaticPagesHelper::groups_call
  end

end
