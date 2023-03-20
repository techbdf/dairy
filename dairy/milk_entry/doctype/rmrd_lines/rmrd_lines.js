// Copyright (c) 2020, Dexciss Technology Pvt Ltd and contributors
// For license information, please see license.txt

frappe.ui.form.on('RMRD Lines', {

	after_save: function(frm) {
	    if(frm.doc.__islocal)
	    {
	         cur_frm.cscript.calculate_total_cans_wt()
	    }
	 },
	//  g_cow_milk: function(frm) {
	//      cur_frm.cscript.calculate_total_cans_wt()
	//  },
	//  g_buf_milk: function(frm) {
	//      cur_frm.cscript.calculate_total_cans_wt()
	//  },
	//  g_mix_milk: function(frm) {
	//      cur_frm.cscript.calculate_total_cans_wt()
	//  },
	 rmrd_good_cow_milk: function(frm) {
	    cur_frm.cscript.calculate_total_cans_wt()
	 },

	 rmrd_good_buf_milk: function(frm) {
		cur_frm.cscript.calculate_total_cans_wt()
        
	 },

	 rmrd_good_mix_milk: function(frm) {
	    cur_frm.cscript.calculate_total_cans_wt()
        
	 },

	 g_cow_milk_can: function(frm) {
	     cur_frm.cscript.calculate_total_cans_wt()
	 },
	 g_buf_milk_can: function(frm) {
	     cur_frm.cscript.calculate_total_cans_wt()
	 },
	 g_mix_milk_can: function(frm) {
	     cur_frm.cscript.calculate_total_cans_wt()
	 },

	 s_cow_milk: function(frm) {
	     cur_frm.cscript.calculate_total_cans_wt()
	 },
	 s_buf_milk: function(frm) {
	     cur_frm.cscript.calculate_total_cans_wt()
	 },
	 s_mix_milk: function(frm) {
	     cur_frm.cscript.calculate_total_cans_wt()
	 },
	 s_cow_milk_can: function(frm) {
	     cur_frm.cscript.calculate_total_cans_wt()
	 },
	 s_buf_milk_can: function(frm) {
	     cur_frm.cscript.calculate_total_cans_wt()
	 },
	 s_mix_milk_can: function(frm) {
	     cur_frm.cscript.calculate_total_cans_wt()
	 },

	 c_cow_milk: function(frm) {
	     cur_frm.cscript.calculate_total_cans_wt()
	 },
	 c_buf_milk: function(frm) {
	     cur_frm.cscript.calculate_total_cans_wt()
	 },
	 c_mix_milk: function(frm) {
	     cur_frm.cscript.calculate_total_cans_wt()
	 },
	 c_cow_milk_can: function(frm) {
	     cur_frm.cscript.calculate_total_cans_wt()
	 },
	 c_buf_milk_can: function(frm) {
	     cur_frm.cscript.calculate_total_cans_wt()
	 },
	 c_mix_milk_can: function(frm) {
	     cur_frm.cscript.calculate_total_cans_wt()
	 },

	 refresh: function(frm) {
		frm.set_df_property("rmrd_good_cow_milk", "read_only", frm.is_new() ? 0 : 1);
		frm.set_df_property("rmrd_good_buf_milk", "read_only", frm.is_new() ? 0 : 1);
		frm.set_df_property("rmrd_good_mix_milk", "read_only", frm.is_new() ? 0 : 1);
		console.log('Stock entry',frm.doc.stock_entry)
		if(!frm.doc.__islocal && !frm.doc.stock_entry)
		       {
		           frm.add_custom_button(__('Make Stock Entry'),function() {
		               return frappe.call({
		                   doc: frm.doc,
		                   method: 'make_stock_entry',
		                   callback: function(r) {
		                       var doc = frappe.model.sync(r.message);
		                       frappe.set_route("Form", doc[0].doctype, doc[0].name);
		                   }
		               });
		           }).addClass('btn-primary');
		       }

	},
	onload:function(frm){
        frm.set_query('rmrd', function(doc) {
            return {
                filters: {
                    "status":"In-Progress"
                }
            };
        });

        frm.set_query('dcs', function(doc) {
            return {
                filters: {
                     "route": frm.doc.route,
                     "is_dcs": 1
                }
            };
        });
     }
});


cur_frm.cscript.calculate_total_cans_wt = function(){
    return frappe.call({
            doc: cur_frm.doc,
            method: 'calculate_total_cans_wt',
            callback: function(r) {
               cur_frm.refresh_fields();
            }
    });
}

