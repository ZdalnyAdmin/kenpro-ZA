/*!
 * froala_editor v1.2.6 (http://editor.froala.com)
 * License http://editor.froala.com/license
 * Copyright 2014-2015 Froala Labs
 */
!function(a){a.Editable.DEFAULTS=a.extend(a.Editable.DEFAULTS,{maxCharacters:-1,countCharacters:!0}),a.Editable.prototype.validKeyCode=function(a,b){return b?!1:a>47&&58>a||32==a||13==a||a>64&&91>a||a>95&&112>a||a>185&&193>a||a>218&&223>a},a.Editable.prototype.charNumber=function(){return this.getText().length},a.Editable.prototype.checkCharNumber=function(a,b,c){if(b.options.maxCharacters<0)return!0;if(b.charNumber()<b.options.maxCharacters)return!0;var d=c.which,e=(c.ctrlKey||c.metaKey)&&!c.altKey;return b.validKeyCode(d,e)?(b.triggerEvent("maxCharNumberExceeded",[],!1),!1):!0},a.Editable.prototype.checkCharNumberOnPaste=function(b,c,d){if(c.options.maxCharacters<0)return!0;var e=a("<div>").html(d).text().length;return e+c.charNumber()<=c.options.maxCharacters?d:(c.triggerEvent("maxCharNumberExceeded",[],!1),"")},a.Editable.prototype.updateCharNumber=function(a,b){if(b.options.countCharacters){var c=b.charNumber()+(b.options.maxCharacters>0?"/"+b.options.maxCharacters:"");b.$box.attr("data-chars",c)}},a.Editable.prototype.initCharNumber=function(){this.$original_element.on("editable.keydown",this.checkCharNumber),this.$original_element.on("editable.onPaste",this.checkCharNumberOnPaste),this.$original_element.on("editable.keyup",this.updateCharNumber),this.$original_element.on("editable.contentChanged",this.updateCharNumber),this.updateCharNumber(null,this)},a.Editable.initializers.push(a.Editable.prototype.initCharNumber)}(jQuery);