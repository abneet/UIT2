/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


App.controller('EventCalendarController', ['$filter','$scope','$http','Grade','Event','APISource','toaster', function($filter,$scope,$http,Grade,Event,APISource,toaster) {
  'use strict';

  
 $scope.hours=["01","02","03","04","05","06","07","08","09","10","11","12"];
$scope.minutes=["00","05"]
var i=0;

for(i=10;i<=55;i+=5)
{
    $scope.minutes.push(i.toString())
}
$scope.s_zone="AM";
$scope.s_hour="00";
$scope.s_minute="00";
$scope.e_zone="AM";
$scope.e_hour="00"
$scope.e_minute="00";       
        
        
        
        
        
        
        
        
        
        
        $scope.eventList = Event.query(
                  function(){
                    var date;  
                    var d,m,y;
                    var events = []
                    angular.forEach($scope.eventList,function(value,key){
                        date = value.eventDate
                        y = date.substring(0, 4)
                        m = date.substring(5, 7) -1;
                        d = date.substring(8, 10)
                        
                        
                        
                       events.push(
                                {
                                      title: value.title+" "+value.startTime+" to "+value.endTime,
                                      start: new Date(parseInt(y), parseInt(m), parseInt(d)),
                                      backgroundColor: '#f5695'+d, //red 
                                      borderColor: '#f56954' //red
                                });
                       
                       
                    });     
                  $scope.eventArray = events
                     
                       
                       if(!$.fn.fullCalendar) return;

  // global shared var to know what we are dragging
  var draggingEvent = null;


  /**
   * ExternalEvent object
   * @param jQuery Object elements Set of element as jQuery objects
   */
  var ExternalEvent = function (elements) {
      
      if (!elements) return;
      
      elements.each(function() {
          var $this = $(this);
          // create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
          // it doesn't need to have a start or end
          var calendarEventObject = {
              title: $.trim($this.text()) // use the element's text as the event title
          };

          // store the Event Object in the DOM element so we can get to it later
          $this.data('calendarEventObject', calendarEventObject);

          // make the event draggable using jQuery UI
          $this.draggable({
              zIndex: 1070,
              revert: true, // will cause the event to go back to its
              revertDuration: 0  //  original position after the drag
          });

      });
  };

  /**
   * Invoke full calendar plugin and attach behavior
   * @param  jQuery [calElement] The calendar dom element wrapped into jQuery
   * @param  EventObject [events] An object with the event list to load when the calendar displays
   */
  function initCalendar(calElement, events) {

      // check to remove elements from the list
      var removeAfterDrop = $('#remove-after-drop');

      calElement.fullCalendar({
          isRTL: $scope.app.layout.isRTL,
          header: {
              left:   'prev,next today',
              center: 'title',
              right:  'month,agendaWeek,agendaDay'
          },
          buttonIcons: { // note the space at the beginning
              prev:    ' fa fa-caret-left',
              next:    ' fa fa-caret-right'
          },
          buttonText: {
              today: 'today',
              month: 'month',
              week:  'week',
              day:   'day'
          },
          editable: true,
          droppable: true, // this allows things to be dropped onto the calendar 
          drop: function(date, allDay) { // this function is called when something is dropped
              
              var $this = $(this),
                  // retrieve the dropped element's stored Event Object
                  originalEventObject = $this.data('calendarEventObject');

              // if something went wrong, abort
              if(!originalEventObject) return;

              // clone the object to avoid multiple events with reference to the same object
              var clonedEventObject = $.extend({}, originalEventObject);

              // assign the reported date
              clonedEventObject.start = date;
              clonedEventObject.allDay = allDay;
              clonedEventObject.backgroundColor = $this.css('background-color');
              clonedEventObject.borderColor = $this.css('border-color');

              // render the event on the calendar
              // the last `true` argument determines if the event "sticks" 
              // (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
              calElement.fullCalendar('renderEvent', clonedEventObject, true);
              
              // if necessary remove the element from the list
              if(removeAfterDrop.is(':checked')) {
                $this.remove();
              }
          },
          eventDragStart: function (event, js, ui) {
            draggingEvent = event;
          },
          // This array is the events sources
          events: events
      });
  }

  /**
   * Inits the external events panel
   * @param  jQuery [calElement] The calendar dom element wrapped into jQuery
   */
  function initExternalEvents(calElement){
    // Panel with the external events list
    var externalEvents = $('.external-events');

    // init the external events in the panel
    new ExternalEvent(externalEvents.children('div'));

    // External event color is danger-red by default
    var currColor = '#f6504d';
    // Color selector button
    var eventAddBtn = $('.external-event-add-btn');
    // New external event name input
    var eventNameInput = $('.external-event-name');
    // Color switchers
    var eventColorSelector = $('.external-event-color-selector .circle');

    // Trash events Droparea 
    $('.external-events-trash').droppable({
      accept:       '.fc-event',
      activeClass:  'active',
      hoverClass:   'hovered',
      tolerance:    'touch',
      drop: function(event, ui) {
        
        // You can use this function to send an ajax request
        // to remove the event from the repository
        
        if(draggingEvent) {
          var eid = draggingEvent.id || draggingEvent._id;
          // Remove the event
          calElement.fullCalendar('removeEvents', eid);
          // Remove the dom element
          ui.draggable.remove();
          // clear
          draggingEvent = null;
        }
      }
    });

    eventColorSelector.click(function(e) {
        e.preventDefault();
        var $this = $(this);

        // Save color
        currColor = $this.css('background-color');
        // De-select all and select the current one
        eventColorSelector.removeClass('selected');
        $this.addClass('selected');
    });

    eventAddBtn.click(function(e) {
        e.preventDefault();
        
        // Get event name from input
        var val = eventNameInput.val();
        // Dont allow empty values
        if ($.trim(val) === '') return;
        
        // Create new event element
        var newEvent = $('<div/>').css({
                            'background-color': currColor,
                            'border-color':     currColor,
                            'color':            '#fff'
                        })
                        .html(val);

        // Prepends to the external events list
        externalEvents.prepend(newEvent);
        // Initialize the new event element
        new ExternalEvent(newEvent);
        // Clear input
        eventNameInput.val('');
    });
  }

  /**
   * Creates an array of events to display in the first load of the calendar
   * Wrap into this function a request to a source to get via ajax the stored events
   * @return Array The array with the events
   */
   


  // When dom ready, init calendar and events
  $(function() {

      // The element that will display the calendar
      var calendar = $('#calendar');
        console.log(events)
        var demoEvents = events;

      initExternalEvents(calendar);

      initCalendar(calendar, demoEvents);

  });

$scope.classEvent = false;
                        
                     
                     
                     
                     
                  
                  
                  
                  
                  });



/*
 * Time Picker
 */
$scope.mytime = new Date();

  $scope.hstep = 1;
  $scope.mstep = 15;

  $scope.options = {
    hstep: [1, 2, 3],
    mstep: [1, 5, 10, 15, 25, 30]
  };

  $scope.ismeridian = true;
  $scope.toggleMode = function() {
    $scope.ismeridian = ! $scope.ismeridian;
  };

  $scope.update = function() {
    var d = new Date();
    d.setHours( 14 );
    d.setMinutes( 0 );
    $scope.mytime = d;
  };

  $scope.changed = function () {
    console.log('Time changed to: ' + $scope.mytime);
  };

  $scope.clear = function() {
    $scope.mytime = null;
  };
/*
 * End time picker
 */



/*
 * Class list
 */
  $scope.classList = Grade.query(  function(){        $scope.selectedClass = $scope.classList[0];
                                                                                 
                                                                                 
                                                                                 
                                                                                }    
                                                                                );
/*
 * End class List
 */





/*
 * save event
 */
var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!

    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd
    } 
    if(mm<10){
        mm='0'+mm
    } 
    var today = dd+'-'+mm+'-'+yyyy;
    $scope.eventDate = today;

   $scope.saveEvent = function(date,eventInstance){
       
     
          var date = $('#e_date').val()
          
       
          
       
         if(!$scope.classEvent)
         {
                 var eventObj = { date: date , title:eventInstance.title ,description: eventInstance.description , startTime:eventInstance.startTime , endTime: eventInstance.endTime , flag:"SCHOOL" };
    
         }
         else
         {
                 var eventObj = { date: date , title:eventInstance.title ,description: eventInstance.description , startTime:eventInstance.startTime , endTime: eventInstance.endTime , flag:"GRADE" , grade:eventInstance.selectedClass.gradeId };
    
         } 
         console.log(JSON.stringify(eventObj))
         toaster.pop("wait", "Saving data"," saving please wait.. ");
          $http.post(APISource.currentApiPoint+'/app/admin/saveEvent',eventObj).
                                                                                            success(function(data, status, headers, config) {
                                                                                                 $('.toast-wait').hide();
                                                                                               //  window.location.reload()
                                                                                                $scope.pop('Success','Data saved','Events added' );
                                                                                            }).
                                                                                            error(function(data, status, headers, config) {
                                                                                                console.log(data)
                                                                                              // called asynchronously if an error occurs
                                                                                              // or server returns response with an error status.
                                                                                            });
         
        
   }

/*
 * end save event
 */



 $scope.pop = function(type,title,text) {
                                                                       $scope.toaster = {
                                                                                type: (type) ? type : 'success',
                                                                                title: (title) ? title :'Title',
                                                                                text:  (text) ? text :'Message'
                                                                            };  
    toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
  };





}]);