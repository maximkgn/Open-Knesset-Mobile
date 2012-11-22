Ext.regController('Bills', {

    // index action
    Index: function(options){
        if (!this.billsView) {
            this.billsView = this.render({
                xtype: 'BillsView',
            });
            var billList = this.billsView.query('#MemberBillList')[0];
			var billsController = this;
            billList.addListener('itemtap', function(that, index, item, e){
                var record = that.store.getAt(index);
                billsController._gotoBill(record);
            });
        }

        //ROYCHANGE
        // var member = OKnesset.MemberStore.findBy(function(r){
        //     return r.data.id === parseInt(options.id)
        // });
        // member = this.currentMember = OKnesset.MemberStore.getAt(member).data;
        var member = this.currentMember = getMembersById(options.id)[0];
        OKnesset.MemberBillsStore.loadData(member.bills);

        // scroll bill list up
        if (options.pushed) {
            var billList = this.billsView.query('#MemberBillList')[0];
            if (billList.scroller) {
                billList.scroller.scrollTo({
                    x: 0,
                    y: 0
                });
            }
        }
        // if there are no bills for the current member, display a text explaining
        // that.
        if (this.hasExcuseForNoBills(member)) {
            this.billsView.query('#MemberBillList')[0].emptyText = "<br/><br/><br/>" +
            OKnesset.strings.excuseForNoBills;
        } else {
            this.billsView.query('#MemberBillList')[0].emptyText = "";
        }
        this.billsView.query('#MemberBillList')[0].refresh();

        this.application.viewport.setActiveItem(this.billsView, options.animation);
    },
    /**
     * Returns true if the member is a minister, or is the chairperson of the
     * Knesset.
     *
     * @param member
     * @returns {Boolean}
     */
    hasExcuseForNoBills: function(member){
        return (member.roles.indexOf(OKnesset.strings.ministerIndicator) != -1 || member.roles === OKnesset.strings.knessetChairman);
    },

    /**
     * Open Bill in browser. open the browser to display the bill in oknesset.org's
     * website
     */
    _gotoBill: function(record){
        var bill = record.data;
        bill.id = bill.url.match(/\/(\d+)\/$/)[1];
        if (bill.id != null)
            OKnesset.app.controllers.navigation.dispatchPanel('BillDetails/Index/' + bill.id, this.historyUrl);
    }
});
