class StaticPagesController < ApplicationController
	layout 'nav_amt'
	
  def home
  	@specific_js = ["Chart.min.js"]

  	start_date = Time.parse("2015-01-01 00:00").to_i*1000
  	end_date = Time.parse("2015-01-31 00:00").to_i*1000

  	#@response_body = StaticPagesHelper::asset_payloads_call("Pulsera_001", start_date.to_s, end_date.to_s)
  	gon.groups = StaticPagesHelper::groups_call
  	gon.alerts_last_7days = StaticPagesHelper::get_groups_alerts_last_7days(gon.groups)
    gon.assets_latest_payload = StaticPagesHelper::get_groups_latest_payloads(gon.groups, 1)
  end

  def send_groups
    if request.xhr?
      render json: StaticPagesHelper::groups_call
    else
      render json: "Bad request"
    end
  end

  def send_group_alerts_last_7days
    if request.xhr?
      groups = JSON.parse(request.body.read)
      render json: StaticPagesHelper::get_groups_alerts_last_7days(groups)
    else
      render json: "Bad request"
    end
  end

  def send_group_latest_payload
    if request.xhr?
      groups = JSON.parse(request.body.read)
      render json: StaticPagesHelper::get_groups_latest_payloads(groups, 1)
    else
      render json: "Bad request"
    end
  end

  #HACER LOS DOS ULTIMOS METODOS JUNTOS
end
