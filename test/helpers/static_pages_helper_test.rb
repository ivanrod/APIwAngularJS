require 'test_helper'

class StaticPagesHelperTest < ActionView::TestCase
	test "Should assert" do 
		location = StaticPagesHelper::random_location(42.1, 1, 20)
		assert location.class==Hash
	end
end
