import React from 'react';
import interact from 'Interact';
import firebase, {firebaseRef} from 'app/firebase/';

var Dashboard = React.createClass ({
    
    getInitialState: function () {
        return ({
            postitsOnBoard: [],
            firstLoading: true,
            count: 1
        });
    },
    
    componentWillMount: function () {
        var _this = this;

        // firebaseRef.on('child_added', (snapshot) => {
        //     _this.postitsOnBoard.push(snapshot.val());
        //     _this.setState({
        //         postitsOnBoard: _this.postitsOnBoard
        //     })    
        // });
        var postitRef = firebaseRef.child('card-'+ _this.state.count);
        postitRef.set({
            id: 'card1',
            text: 'test'
        })
    },

    componentDidMount: function () {

        var {firstLoading, count} = this.state;

        if(firstLoading) {
            $('#outer-zone').append('<textarea class="draggable drag-drop"></textarea>');
            $('.draggable').attr('id', 'card-' + count);

            this.setState({
                firstLoading: false
            });
        }
        else{
            console.log('other loadings');
        }
        
        this.draganddrop();
    }, 

    randomBackground: function () {
        var colors = ['#ff9999', '#99ff99', '#80ccff', '#ffff80'];   
        var randColor = colors[Math.floor(Math.random() * colors.length)];
        // console.log(randColor);

        return randColor;
    },

    draganddrop: function () {
        var _this = this;
        var x = 0, y = 0;
        
        // target elements with the "draggable" class
        interact('.draggable')
            .draggable({
                snap: {
                    targets: [
                        interact.createSnapGrid({ x: 30, y: 30 })
                    ],
                    range: Infinity,
                    relativePoints: [ { x: 0, y: 0 } ]
                },
                // enable inertial throwing
                inertia: true,
                // keep the element within the area of #dashboard-area
                restrict: {
                    restriction: "#dashboard-area",
                    endOnly: true,
                    elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
                },
                // enable autoScroll
                autoScroll: true,

                // call this function on every dragmove event
                onmove: dragMoveListener,
                // call this function on every dragend event
                onend: function (event) {
                    var textEl = event.target.querySelector('p');
                    
                    textEl && (textEl.textContent =
                    'moved a distance of '
                    + (Math.sqrt(event.dx * event.dx + event.dy * event.dy)|0) + 'px');
                }
            })
            .on('click', (event) => {
                var cardId = event.target.id;
                
                $("#" + cardId).blur((e) => {
                    var id = e.target.id;
                    var allPostits = _this.state.postitsOnBoard;
                    
                    allPostits[e.target.id].text = e.target.value;

                    _this.setState({
                        postitsOnBoard: allPostits 
                    });

                });
            });

        function dragMoveListener (event) {
            var target = event.target,
            // keep the dragged position in the data-x/data-y attributes
            x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
            y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
            
            // translate the element
            target.style.webkitTransform =
            target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

            // update the posiion attributes
            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
        }


        // enable draggables to be dropped into this
        interact('.dropzone').dropzone({
            // only accept elements matching this CSS selector
            accept: '.draggable',
            // Require a 75% element overlap for a drop to be possible
            overlap: 0.75,

            // listen for drop related events:

            ondropactivate: function (event) {
                // add active dropzone feedback
                // console.log('drop-active');
                event.target.classList.add('drop-active');

            },
            ondragenter: function (event) {

                var draggableElement = event.relatedTarget,
                    dropzoneElement = event.target;

                // feedback the possibility of a drop
                dropzoneElement.classList.add('drop-target');
                draggableElement.classList.add('can-drop');
                // draggableElement.textContent = 'Dragged in';
                
                $('img[src="/img/close-bin.svg"]').attr('src', '/img/open-bin.svg');


            },
            ondragleave: function (event) {
                // remove the drop feedback style
                event.target.classList.remove('drop-target');
                event.relatedTarget.classList.remove('can-drop');
                // event.relatedTarget.textContent = 'Dragged out';

                $('img[src="/img/open-bin.svg"]').attr('src', '/img/close-bin.svg');

            },
            ondrop: function (event) {

                // event.relatedTarget.textContent = 'Dropped';
                // console.log(event.relatedTarget.id);
                var {outerPostit, postitsOnBoard, count} = _this.state; 
                // var cardId = 'card-' + outerPostit.id;
                var cardId = event.relatedTarget.id;

                // Check if card already exists on dashboard
                if(postitsOnBoard[cardId] !== undefined) {
                    console.log('already exists');
                    $('img[src="/img/open-bin.svg"]').attr('src', '/img/close-bin.svg');
                }
                else {
                    var cardToPost = {
                        id: cardId,
                        text: ''
                    };

                    _this.setState({
                        postitsOnBoard: {...postitsOnBoard, [cardId]: cardToPost},
                        count: count + 1,
                    });
                    
                    var newDivCard = $('<textarea class="draggable drag-drop"></textarea>');
                    $('#outer-zone').append(newDivCard);
                    newDivCard.attr('id', 'card-' + (count+1) );
                    newDivCard.css('background-color', _this.randomBackground());

                    $('img[src="/img/open-bin.svg"]').attr('src', '/img/close-bin.svg');
                }
                
            },
            ondropdeactivate: function (event) {
                // remove active dropzone feedback
                event.target.classList.remove('drop-active');
                event.target.classList.remove('drop-target');

            }
        });




        // enable draggables to be dropped into this
        interact('.deletezone').dropzone({
            accept: '.draggable',
            overlap: 0.50,

            ondropactivate: function (event) {
                event.target.classList.add('drop-active');
            },
            ondragenter: function (event) {

                var draggableElement = event.relatedTarget,
                    dropzoneElement = event.target;

                // feedback the possibility of a drop
                dropzoneElement.classList.add('drop-bin');
                draggableElement.classList.add('can-drop');

                // $('#bin').remove('i');
                // $('#bin').replaceWith("<img style={{height: '80%'}} src='/img/delete-empty.svg' />");  
                // draggableElement.textContent = 'Dragged in';
                $('img[src="/img/close-bin.svg"]').attr('src', '/img/open-bin.svg');

            },
            ondragleave: function (event) {
                // remove the drop feedback style
                event.target.classList.remove('drop-target');
                event.relatedTarget.classList.remove('can-drop');
                // event.relatedTarget.textContent = 'Dragged out';
                
                var cardId = event.relatedTarget.id;
                $('#'+cardId).addClass('animated fadeOutUp');
            },
            ondrop: function (event) {

                var {outerPostit, postitsOnBoard, count} = _this.state; 
                var cardId = event.relatedTarget.id;

                $('#'+cardId).animate({ opacity: 0.25 }, 500, "linear", function() {
                    $('#'+cardId).fadeOut();
                    
                    // Check if already exists a card in the dashboard
                    if(Object.keys(_this.state.postitsOnBoard).length > 0) {
                        console.log('has', $('#create-card-area').has('textarea').length);
                        
                        // Remove the specific div from the DOM - delete it from the state
                        $('#' + cardId).remove();
                        delete postitsOnBoard[cardId];
                        
                        console.log('count before delete', count);
                        _this.setState({
                            postitsOnBoard: postitsOnBoard
                        });
                        
                        $('img[src="/img/open-bin.svg"]').attr('src', '/img/close-bin.svg');
                    }
                    else {
                        
                        $('#outer-zone').append('<textarea class="draggable drag-drop"></textarea>');
                        $('.draggable').attr('id', 'card-' + count);
                        $('.draggable').attr('ref', 'card-' + count);

                        $('img[src="/img/open-bin.svg"]').attr('src', '/img/close-bin.svg'); 
                    
                    }

                });

            },
            ondropdeactivate: function (event) {
                // remove active dropzone feedback
                event.target.classList.remove('drop-active');
                event.target.classList.remove('drop-target');
            }
        });

    },


    render: function () {
        var {outerPostit, postitsOnBoard, firstLoading} = this.state;
        
        console.log('postitsOnBoard', postitsOnBoard);
        
        return (
            <div id="dashboard-area" className="row noMarginBottom">
                <div id="outer-zone" className="col s2 height100 center">
                    <div id="create-card-area" className="row" style={{height:'50%'}}>
                        <div className="col s12">
                            
                        </div>
                    </div>
                    <div className="row" style={{height:'50%'}}>
                        <div className="col s12" id="delete-area" style={{height:'80%'}}>
                            {/* <i className="material-icons grey-text deletezone" id="bin">delete</i> */}
                            <img src="/img/close-bin.svg" id="bin" alt="" className="deletezone" style={{height: '100%', width:'130%'}}/>
                        </div>
                    </div>
                </div>

                <div className="col s10 height100" style={{paddingRight: 0}}>
                    <div id="inner-dropzone" className="dropzone"></div>
                </div>
            </div>
        );
    }
});

export default Dashboard;