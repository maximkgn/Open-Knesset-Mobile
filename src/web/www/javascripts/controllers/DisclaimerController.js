Ext.regController('Disclaimer', {

    // index action
	Index: function(options)
    {
        if ( ! this.view)
        {
            this.view = this.render({
                xtype: 'DisclaimerView',
            });

            var mask = this.mask = new Ext.LoadMask(Ext.getBody(), OKnesset.strings.showDisclaimer);
            this.view.addListener('hide', function(){mask.hide();});

            this.view.query('#cancelDisclaimerBtn')[0].setHandler(function(){
    			localStorage.setItem("disclaimerDismissed", true);
				dispatchBack();
            });

        }

        this.view.show(options.animation);
        this.mask.show();
    }

});