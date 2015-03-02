class StaticPagesController < ApplicationController
	layout 'nav_amt'
	
  def home
  	@specific_js = ["Chart.min.js"]

  	start_date = Time.parse("2015-01-01 00:00").to_i*1000
  	end_date = Time.parse("2015-01-31 00:00").to_i*1000

  	#@response_body = StaticPagesHelper::asset_payloads_call("Pulsera_001", start_date.to_s, end_date.to_s)
  	#@groups = StaticPagesHelper::groups_call
  	#gon.alerts_last_7days = StaticPagesHelper::get_groups_alerts_last_7days(@groups)
    #gon.assets_latest_payload = StaticPagesHelper::get_groups_latest_payloads(@groups, 1)
  end

  def send_groups
    if request.xhr?
      groups_call = StaticPagesHelper::groups_call
      groups_call = StaticPagesHelper::get_group_names_from_my_db(groups_call)
      render json: (groups_call).to_json
    else
      render json: "bad request"
    end
  end

  def send_groups_alerts_last_7days
    groups = JSON.parse(request.body.read)
    render json: StaticPagesHelper::get_groups_alerts_last_7days(groups)
    
  end

  def send_groups_latest_payload
    groups = JSON.parse(request.body.read)
    render json: StaticPagesHelper::get_groups_latest_payloads(groups, 1)
    
  end
  #HACER LOS DOS ULTIMOS METODOS JUNTOS

  def get_elder_data
    @user_id = JSON.parse(request.body.read)
    @elder_data = Elder.find_by_userId(@user_id["userId"])
    if @elder_data == nil
      render json: "No elder with this Id in the DB".to_json
    else
      render json: @elder_data.to_json
    end
  end

  def edit_elder_data
    @new_elder_data = JSON.parse(request.body.read)
    @old_elder_data = Elder.find_by_userId(@new_elder_data["userId"])
    if @old_elder_data == nil
      p "No data"
      @new_elder = Elder.new(@new_elder_data)
      @new_elder.save

      p @new_elder_data
      p @old_elder_data

      render json: "User created".to_json

    else
      @old_elder_data.update_attributes(@new_elder_data)

      p @new_elder_data
      p @old_elder_data

      render json: "User edited".to_json
    end  

  end

  def get_all_user_alerts
    @user = JSON.parse(request.body.read)

    if @user['assets'] == nil 
      render json: StaticPagesHelper::get_all_group_alerts(@user['userId'])
    else
    end

  end

  def get_latest_payload_from_group
    @user = JSON.parse(request.body.read)
    render json: StaticPagesHelper::get_latest_group_payload(@user['userId'])
  end

end
