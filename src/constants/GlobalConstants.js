var React = require('react-native');

var{
	Dimensions
} = React;
var deviceScreen = Dimensions.get('window');

var GlobalConstants = {

	deviceScreen: deviceScreen,
	screenHeight: deviceScreen.height,
	screenWidth: deviceScreen.width,


	colors:{
		qtColor: '#00a4b5',
		red: '#FF0000',
		green: '#8BC34A',
		text_white: '#FFFFFF',
		text_gray: '#D5D5D5',
		gray_dark: '#151B20',
		yellow: '#f2d936',
		border_gray: '#e6e6e6',
		gray_dark: '#151B20',
		gray: '#1B2228',
		gray_mid:'#242B30'
	}
};

module.exports = GlobalConstants;

/*
@qtColor: #00a4b5;
@twitterColor: #55ACEE;
@red: #d31030;
@green: #09bb30;

@text-white: #FFFFFF;
@text-gray: #D5D5D5;
@text-gray-lighter: #757D77;
@text-gray-dark: #668086;
@text-gray-darker: #3B4146;

@gray-darkest: #131517;
@gray-darker: #141A1F;
@gray-dark: #151B20;
@gray: #1B2228;
@gray-light: #242B30;
@gray-lighter: #262E35;

//@blue: #009eed;
@blue: #0070A6;
@blue-darker: #336690;

@yellow: #f2d936;

@slideBtnHeight: 37px;*/