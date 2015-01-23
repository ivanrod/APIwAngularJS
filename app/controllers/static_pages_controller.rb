class StaticPagesController < ApplicationController
	layout 'nav_amt'
  def home

  	start_date = Time.parse("2015-01-01 00:00").to_i*1000
  	end_date = Time.parse("2015-01-31 00:00").to_i*1000

  	#@response_body = StaticPagesHelper::payloads_call("Pulsera_001", start_date.to_s, end_date.to_s)
  	assets_groups = StaticPagesHelper::groups_call
  	@response_body = assets_groups
  end
end
