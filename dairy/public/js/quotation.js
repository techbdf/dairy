
frappe.ui.form.on('Quotation', {
    setup: function(frm) {
		frm.add_fetch("route", "price_list", "selling_price_list");
	},
	validate: function(frm) {
        var today = new Date();
        var time = today.getHours() + ":" + today.getMinutes();

        frappe.model.get_value('Dairy Settings', {'name': 'Dairy Settings'}, 'morning_locking_time', function(d)
        {
            
            
            var otm = d.morning_locking_time;  
            var td = frappe.datetime.add_days(frappe.datetime.get_today(),1);
            if (frm.doc.delivery_shift == 'Morning') 
            {            
                if(frm.doc.delivery_date == frappe.datetime.get_today())
                {
                    frappe.validated = false;
                    frappe.throw(__('Order locking time is over'));
                    
                }            
                
                if(frm.doc.delivery_date == td)
                {
                    if(time > otm)
                    {
                        frappe.validated = false;
                        frappe.throw(__('Order locking time is over'));
                    }

                }

            }
        });

        frappe.model.get_value('Dairy Settings', {'name': 'Dairy Settings'}, 'evening_locking_time', function(e)
        {
            
            
            var ote = e.evening_locking_time;  
            
            if(frm.doc.delivery_shift == 'Evening')
            {
                if(frm.doc.delivery_date == frappe.datetime.get_today())
                {
                    if(time > ote)
                    {
                        frappe.validated = false;
                        frappe.throw(__('Order locking time is over'));
                    }
                }
            }
        });
    },
    party_name:function(frm){
        if (frm.doc.quotation_to == "Customer")
        {
            return cur_frm.call({
                method:"dairy.milk_entry.custom_delivery_note.get_route_price_list",
                args: {
                        doc_name: cur_frm.doc.party_name
                      },
                callback: function(r)
                    {
                       if(r.message)
                       {
                        frm.set_value("route",r.message.route);
                        frm.set_value("selling_price_list",r.message.p_list);
                       }
                    }
            });
        }
    }
 });   