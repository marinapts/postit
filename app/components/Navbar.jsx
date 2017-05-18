import React from 'react';

var Navbar = React.createClass({
    
    render: function () {
        return (
            <div>
                <nav>
                    <div className="nav-wrapper">
                        <a href="#" className="brand-logo">Post it</a>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li><a href="/">Post it</a></li>
                         </ul>
                    </div>
                </nav>
            </div>
        )
    }
});

export default Navbar;