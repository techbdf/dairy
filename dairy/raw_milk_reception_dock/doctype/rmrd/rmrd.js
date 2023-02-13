// Copyright (c) 2020, Dexciss Technology Pvt Ltd and contributors
// For license information, please see license.txt

frappe.ui.form.on('RMRD', {
	 refresh: function(frm) {
        // if (!frm.doc.__islocal && frm.doc.docstatus == 0 && !frm.doc.hide_start_rmrd_button){
        if (frm.doc.status=='Submitted'){  
            frm.add_custom_button(__('Start RMRD'), function () {
                return frappe.call({
                    doc: frm.doc,
                    method: 'start_rmrd',
                    callback: function(r) {
                        frm.refresh();
                    }
                });
            }).addClass("btn-primary");
        }
        if (frm.doc.status=='In-Progress'){
            frm.add_custom_button(__('Add / Edit RMRD'), function () {
                frappe.route_options = {"rmrd": frm.doc.name};
                frappe.set_route("Report", "RMRD Lines");
        });

            frm.add_custom_button(__('Complete'), function () {
                 return frappe.call({
                    doc: frm.doc,
                    method: 'change_status_complete1',
                    callback: function(r) {
                        frm.refresh();
                    }
                });
            }).addClass("btn-primary");


         }

         
	 },

     before_submit: function(frm) {
        return frm.call('submit_rmrd').then(() => {
            frm.refresh_field('status');
        });
    },
    
	 onload: function(frm){
        frm.set_query('route', function(doc) {
            return {
                filters: {
                    "route_type":"Milk Procurement",
                    "docstatus":1
                }
            };
        });
        frm.set_query('target_warehouse', function(doc) {
            return {
                filters: {
//                    "is_dcs":0,
                    "is_group":0,
                    "company":frappe.defaults.get_user_default("Company"),
                    "disabled":0
                }
            };
        });
    },
});
