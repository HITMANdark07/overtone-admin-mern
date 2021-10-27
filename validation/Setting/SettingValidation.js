const Validator = require('validator');
const isEmpty   = require('../is-empty');


module.exports = function validateSettingInput(data){
    let errors = {};

    data.applicationName       = !isEmpty(data.applicationName) ? data.applicationName : '';
    data.applicationEmail      = !isEmpty(data.applicationEmail) ? data.applicationEmail : '';
    data.logoUrl      = !isEmpty(data.logoUrl) ? data.logoUrl : '';
    data.currency      = !isEmpty(data.currency) ? data.currency : '';
    data.contactNo      = !isEmpty(data.contactNo) ? data.contactNo : '';
    data.address      = !isEmpty(data.address) ? data.address : '';
    data.homebgUrl      = !isEmpty(data.homebgUrl) ? data.homebgUrl : '';
    data.homeTitle      = !isEmpty(data.homeTitle) ? data.homeTitle : '';
    data.homePara      = !isEmpty(data.homePara) ? data.homePara : '';
    data.homeBtnText      = !isEmpty(data.homeBtnText) ? data.homeBtnText : '';
    data.homeBtnPath      = !isEmpty(data.homeBtnPath) ? data.homeBtnPath : '';
    data.aboutHeading      = !isEmpty(data.aboutHeading) ? data.aboutHeading : '';
    data.aboutPara      = !isEmpty(data.aboutPara) ? data.aboutPara : '';
    data.aboutCoverUrl      = !isEmpty(data.aboutCoverUrl) ? data.aboutCoverUrl : '';
    data.aboutVideoUrl      = !isEmpty(data.aboutVideoUrl) ? data.aboutVideoUrl : '';
    data.featurebgUrl      = !isEmpty(data.featurebgUrl) ? data.featurebgUrl : '';
    data.featureTitle      = !isEmpty(data.featureTitle) ? data.featureTitle : '';
    data.featurePara      = !isEmpty(data.featurePara) ? data.featurePara : '';
    data.featureList      = !isEmpty(data.featureList) ? data.featureList : '';
    data.bannerBgUrl      = !isEmpty(data.bannerBgUrl) ? data.bannerBgUrl : '';
    data.bannerText      = !isEmpty(data.bannerText) ? data.bannerText : '';
    data.bannerPara      = !isEmpty(data.bannerPara) ? data.bannerPara : '';
    data.bannerBtnText      = !isEmpty(data.bannerBtnText) ? data.bannerBtnText : '';
    data.bannerBtnPath      = !isEmpty(data.bannerBtnPath) ? data.bannerBtnPath : '';
    data.hashtag      = !isEmpty(data.hashtag) ? data.hashtag : '';
    data.hashImageList      = !isEmpty(data.hashImageList) ? data.hashImageList : '';
    data.footerText      = !isEmpty(data.footerText) ? data.footerText : '';
    data.contactText      = !isEmpty(data.contactText) ? data.contactText : '';
    data.socialLinksList      = !isEmpty(data.socialLinksList) ? data.socialLinksList : '';


    if(Validator.isEmpty(data.applicationName)){
      errors.applicationName= "Application Name is required";
    }
    if(!Validator.isEmail(data.applicationEmail)){
      errors.applicationEmail= "Application Email is Invalid";
    }
    if(Validator.isEmpty(data.applicationEmail)){
      errors.applicationEmail= "Application Email is required";
    }
    if(Validator.isEmpty(data.logoUrl)){
      errors.logoUrl= "Logo Url is required";
    }
    if(Validator.isEmpty(data.currency)){
      errors.currency= "Currency is required";
    }
    if(Validator.isEmpty(data.contactNo)){
      errors.contactNo= "Contact No is required";
    }
    if(Validator.isEmpty(data.address)){
      errors.address= "Address is required";
    }
    if(Validator.isEmpty(data.homebgUrl)){
      errors.homebgUrl= "Home Background Image is required";
    }
    if(Validator.isEmpty(data.homeTitle)){
      errors.homeTitle= "Home Title is required";
    }
    if(Validator.isEmpty(data.homePara)){
      errors.homePara= "Home Para is required";
    }
    if(Validator.isEmpty(data.homeBtnText)){
      errors.homeBtnText= "Home Button Text is required";
    }
    if(Validator.isEmpty(data.homeBtnPath)){
      errors.homeBtnPath= "Home Button Path is required";
    }
    if(Validator.isEmpty(data.homeBtnText)){
      errors.homeBtnText= "Home Button Text is required";
    }
    if(Validator.isEmpty(data.aboutHeading)){
      errors.aboutHeading= "About Heading is required";
    }
    if(Validator.isEmpty(data.aboutPara)){
      errors.aboutPara= "About Paragraph is required";
    }
    if(Validator.isEmpty(data.aboutCoverUrl)){
      errors.aboutCoverUrl= "About Cover Image is required";
    }
    if(Validator.isEmpty(data.aboutVideoUrl)){
      errors.aboutVideoUrl= "About Video URL is required";
    }
   
    if(Validator.isEmpty(data.featurebgUrl)){
      errors.featurebgUrl= "Feature Background is required";
    }
    if(Validator.isEmpty(data.featureTitle)){
      errors.featureTitle= "Feature Title is required";
    }
    if(Validator.isEmpty(data.featurePara)){
      errors.featurePara= "Feature Para is required";
    }
    if(Validator.isEmpty(data.featureList)){
      errors.featureList= "FeatureList is required";
    }
    if(Validator.isEmpty(data.bannerBgUrl)){
      errors.bannerBgUrl= "Banner Background URL is required";
    }
    if(Validator.isEmpty(data.bannerText)){
      errors.bannerText= "Banner Text is required";
    }
    if(Validator.isEmpty(data.bannerPara)){
      errors.bannerPara= "Banner Paragraph is required";
    }
    if(Validator.isEmpty(data.bannerBtnText)){
      errors.bannerBtnText= "Banner Button Text is required";
    }
    if(Validator.isEmpty(data.bannerBtnPath)){
      errors.bannerBtnPath= "Banner Button Path is required";
    }
    if(Validator.isEmpty(data.hashtag)){
      errors.hashtag= "Hashtag is required";
    }
    if(Validator.isEmpty(data.hashImageList)){
      errors.hashImageList= "Hash Tag Image List is required";
    }
    if(Validator.isEmpty(data.footerText)){
      errors.footerText= "Footer Text is required";
    }
    if(Validator.isEmpty(data.contactText)){
      errors.contactText= "Contact Text is required";
    }
    if(Validator.isEmpty(data.socialLinksList)){
      errors.socialLinksList= "Social Links List is required";
    }
    return{
      errors,
      isValid: isEmpty(errors)
    };
};

