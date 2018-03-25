'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Stopwatch = function (_React$Component) {
    _inherits(Stopwatch, _React$Component);

    function Stopwatch() {
        _classCallCheck(this, Stopwatch);

        // stopwatch class inherits from react component
        var _this = _possibleConstructorReturn(this, (Stopwatch.__proto__ || Object.getPrototypeOf(Stopwatch)).call(this));

        _this.reset();
        _this.state = {
            isRunning: false,
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
        };
        return _this;
    }

    _createClass(Stopwatch, [{
        key: 'reset',
        value: function reset() {
            var times = {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            };
            this.setState({ times: times });
        }
    }, {
        key: 'format',
        value: function format() {
            return pad0(this.state.times.minutes) + ':' + pad0(this.state.times.seconds) + ':' + pad0(Math.floor(this.state.times.miliseconds));
        }
    }, {
        key: 'start',
        value: function start() {
            var _this2 = this;

            if (!this.state.isRunning) {
                this.setState({ isRunning: true });
                this.watch = setInterval(function () {
                    return _this2.step();
                }, 10);
            }
        }
    }, {
        key: 'step',
        value: function step() {
            // checks if the timer is working
            if (!this.state.isRunning) return;
            this.calculate(); // if so, calculate miliseconds, secs and mins (below)
        }
    }, {
        key: 'calculate',
        value: function calculate() {
            var times = this.state.times;
            times.miliseconds += 1;

            if (times.miliseconds >= 100) {
                times.seconds += 1;
                times.miliseconds = 0;
            }
            if (times.seconds >= 60) {
                times.minutes += 1;
                times.seconds = 0;
            }

            this.setState({ times: times }); // object where we store current time after running the timer
        }
    }, {
        key: 'stop',
        value: function stop() {
            // stopping the timer: not running, canceling the 'watch' function from start()
            this.setState({ isRunning: false });
            clearInterval(this.watch);
        }
    }, {
        key: 'restart',
        value: function restart() {
            // restarting the timer: it is not running, state reset to "0"
            this.setState({ isRunning: false });
            this.setState({
                times: {
                    miliseconds: 0,
                    seconds: 0,
                    minutes: 0
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            return React.createElement(
                'div',
                { className: 'wrapper' },
                React.createElement(
                    'nav',
                    { className: 'controls' },
                    React.createElement(
                        'button',
                        { onClick: function onClick(e) {
                                return _this3.start(e);
                            } },
                        'Start'
                    ),
                    React.createElement(
                        'button',
                        { onClick: function onClick(e) {
                                return _this3.stop(e);
                            } },
                        'Stop'
                    ),
                    React.createElement(
                        'button',
                        { onClick: function onClick(e) {
                                return _this3.restart(e);
                            } },
                        'Reset'
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'stopwatch' },
                    this.format(this.state.times)
                )
            );
        }
    }]);

    return Stopwatch;
}(React.Component);

// pad0 function adds '0' to one-digit numbers


function pad0(value) {
    var result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

ReactDOM.render(React.createElement(Stopwatch, null), document.getElementById('app'));