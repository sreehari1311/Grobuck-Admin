import $ from 'jquery';
import AppDispatcher from '../dispatcher/AppDispatcher';

export default class Utils {
  ajaxPost(data,serviceId,CONST){
      console.log('input');
      console.log(data);
      data = JSON.stringify(data);
      $.ajax({
        url : "service",
        type: "POST",
        data : "json="+JSON.stringify(data)+"&serviceId="+serviceId,
        success: function(response, textStatus, jqXHR){
          AppDispatcher.handleAction({
                    actionType: CONST,
                    data: response
          });
        },
        error: function (jqXHR, textStatus, errorThrown){

        }
      });
  }
  ajaxGet(data,serviceId,CONST){
       $.ajax({
          url : "serviceGet",
          type: "GET",
        success: function(response, textStatus, jqXHR){
        AppDispatcher.handleAction({
                      actionType: CONST,
                      data: response
              });
        AppDispatcher.handleAction({
            actionType: AlatheiaConstants.SHOW_STATUS,
            data: response
          });
            },  
          error: function (jqXHR, textStatus, errorThrown){

          }
    });
  }

}