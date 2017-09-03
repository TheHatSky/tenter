/// <reference path="../typings/tsd.d.ts" />
var Orientation;
(function (Orientation) {
    Orientation[Orientation["Portrait"] = 0] = "Portrait";
    Orientation[Orientation["Landscape"] = 1] = "Landscape";
})(Orientation || (Orientation = {}));
var Device = (function () {
    function Device(name, iconSize, imgurThumbnail, landscapeFontSize, portraitFontSize) {
        this.name = name;
        this.iconSize = iconSize;
        this.imgurThumbnail = imgurThumbnail;
        this.landscapeFontSize = landscapeFontSize;
        this.portraitFontSize = portraitFontSize;
    }
    Object.defineProperty(Device.prototype, "imageFolder", {
        get: function () {
            return this.name;
        },
        enumerable: true,
        configurable: true
    });
    return Device;
}());
Device.Mobile = new Device("mobile", "s", "m", "1rem", "1rem");
Device.Phablet = new Device("phablet", "s", "l", "1rem", "1rem");
Device.Tablet = new Device("tablet", "m", "h", "1rem", "1rem");
Device.Desktop = new Device("desktop", "m", "h", "1rem", "1rem");
Device.DesktopHd = new Device("desktop-hd", "m", "", "1rem", "1rem");
var DpiMode;
(function (DpiMode) {
    DpiMode[DpiMode["Normal"] = 0] = "Normal";
    DpiMode[DpiMode["Retina"] = 1] = "Retina";
})(DpiMode || (DpiMode = {}));
var Tenter;
(function (Tenter) {
    var Gallary = (function () {
        function Gallary() {
        }
        return Gallary;
    }());
    Gallary.Weddings = "weddings";
    Gallary.Fashion = "fashion";
    Gallary.Commercial = "commercial";
    var Settings = (function () {
        function Settings() {
            this.screenWidth = $(window).width();
            this.screenHeight = $(window).height();
        }
        Object.defineProperty(Settings.prototype, "orientation", {
            get: function () {
                return this.screenHeight > this.screenWidth
                    ? Orientation.Portrait
                    : Orientation.Landscape;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Settings.prototype, "device", {
            get: function () {
                var deviceWidth = this.orientation == Orientation.Portrait
                    ? this.screenHeight
                    : this.screenWidth;
                if (deviceWidth < 550)
                    return Device.Mobile;
                else if (deviceWidth < 700)
                    return Device.Phablet;
                else if (deviceWidth < 1000)
                    return Device.Tablet;
                else if (deviceWidth < 1200)
                    return Device.Desktop;
                return Device.DesktopHd;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Settings.prototype, "dpiMode", {
            get: function () {
                if (this._dpiMode == null) {
                    var isRetina = ((window.matchMedia && (window.matchMedia('only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx), only screen and (min-resolution: 75.6dpcm)').matches || window.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: 2/1), only screen and (min--moz-device-pixel-ratio: 2), only screen and (min-device-pixel-ratio: 2)').matches)) || (window.devicePixelRatio && window.devicePixelRatio >= 2));
                    this._dpiMode = isRetina
                        ? DpiMode.Retina
                        : DpiMode.Normal;
                }
                return this._dpiMode;
            },
            enumerable: true,
            configurable: true
        });
        return Settings;
    }());
    Tenter.Settings = Settings;
    var Application = (function () {
        function Application() {
            var _this = this;
            this.setGallarySize = function (galleryName, size) {
                if (size <= 0)
                    throw new RangeError("Gallary size must be greater than zero.");
                if (_this.sizes[galleryName] != null)
                    throw new Error("Gallary " + galleryName + 'is already registered.');
                _this.sizes[galleryName] = size;
            };
            this.updateGallaryBackgroudSize = function (sizeChanged) {
                if (_this.settings.orientation == Orientation.Portrait)
                    $('.portrait').css('background-size', 'cover');
                else
                    $('.portrait').css('background-size', 'contain');
                if (sizeChanged) {
                    $('[data-image-name]').each(function (index, element) {
                        var elem = $(element);
                        var imageName = elem.data('image-name');
                        //elem.css('background-image', 'url(/images/' + this.settings.device.imageFolder + '/' + imageName + ')');
                        elem.css('background-image', "url(https://i.imgur.com/" + imageName + _this.settings.device.imgurThumbnail + ".jpg)");
                    });
                    for (var key in _this.sizes) {
                        if (_this.sizes.hasOwnProperty(key)) {
                            var size = _this.sizes[key];
                            var width = _this.settings.screenWidth / (size + 1);
                            $('.case.' + key)
                                .find('.fp-slidesNav > ul > li > a > span')
                                .css('width', width + 'px')
                                .css('left', 0);
                            $('.case.' + key)
                                .find('.fp-slidesNav ul li')
                                .css('width', width + 'px');
                        }
                    }
                }
            };
            this.updateIconsSize = function () {
                $('.container').find('.icon--s, .icon--m, .icon--l').each(function (index, element) {
                    $(element)
                        .removeClass('icon--s')
                        .removeClass('icon--m')
                        .removeClass('icon--l')
                        .addClass('icon--' + _this.settings.device.iconSize);
                });
            };
            this.prepareIconsSize = function () {
                $('.container').find('[data-size]').each(function (index, element) {
                    $(element).attr('data-size', _this.settings.device.iconSize);
                });
            };
            this.addOnResize = function (func) {
                _this.onResizeFunctions.push(func);
            };
            this.checkResize = function () {
                var newSettings = new Settings();
                var widhtChanged = newSettings.screenWidth != _this.settings.screenWidth;
                var heightChanged = newSettings.screenHeight != _this.settings.screenHeight;
                return widhtChanged || heightChanged;
            };
            this.resizeWatcher = function () {
                setTimeout(function () {
                    if (_this.checkResize())
                        $(window).trigger('resize');
                    _this.resizeWatcher();
                }, 200);
            };
            this.infoHandler = function () {
                $(document).on('click', '.open', function () {
                    $('.close').removeClass('hidden').show();
                    $('.open').hide();
                    $('.description').fadeIn(300);
                });
                $(document).on('click', '.close', function () {
                    $('.close').hide();
                    $('.open').show();
                    $('.description').fadeOut(300);
                });
            };
            this.isOnscreen = function (el) {
                return !((el.offsetLeft + el.offsetWidth) < 0
                    || (el.offsetTop + el.offsetHeight) < 0
                    || (el.offsetLeft > window.innerWidth || el.offsetTop > window.innerHeight));
            };
            this.setInfoVisibility = function () {
                var isBackground = $('section.active .fp-slidesNav')
                    .find('li a')
                    .first()
                    .hasClass('active');
                if (isBackground)
                    $('.bottom.layout-menu').fadeOut(300);
                else
                    $('.bottom.layout-menu').fadeIn(300);
            };
            this.initialize = function () {
                $(window).resize(function () {
                    var oldDevice = _this.settings.device;
                    _this.settings = new Settings();
                    var isDeviceChanged = oldDevice != _this.settings.device;
                    setTimeout(function () {
                        _this.updateGallaryBackgroudSize(isDeviceChanged);
                        _this.updateIconsSize();
                        _this.onResizeFunctions.forEach(function (func) { return func(); });
                    }, 0);
                });
                _this.resizeWatcher();
                $('#fullpage').fullpage({
                    sectionSelector: 'section',
                    anchors: ['', 'contacts', Gallary.Weddings, Gallary.Fashion, Gallary.Commercial],
                    slidesNavPosition: 'bottom',
                    slidesNavigation: true,
                    menu: '#menu',
                    animateAnchor: false,
                    controlArrows: false,
                    loopHorizontal: false,
                    afterRender: function () {
                        $(Application.LeftNavigationSelector)
                            .hide()
                            .on('click', function () { return $.fn.fullpage.moveSlideLeft(); });
                        $(Application.RightNavigationSelector)
                            .on('click', function () { return $.fn.fullpage.moveSlideRight(); });
                        _this.updateGallaryBackgroudSize(true);
                        _this.prepareIconsSize();
                        _this.infoHandler();
                        setTimeout(function () {
                            $('.loader').fadeOut(300);
                        }, 1000);
                    },
                    afterSlideLoad: function () { return _this.setInfoVisibility(); },
                    afterLoad: function () { return _this.setInfoVisibility(); },
                    onLeave: function (index, nextIndex, direction) {
                        if (nextIndex != 1) {
                            $('#menu').removeClass('faded');
                        }
                        else {
                            $('#menu').addClass('faded');
                        }
                    },
                    onSlideLeave: function (anchorLink, index, slideIndex, direction, nextSlideIndex) {
                        var gallerySize = _this.sizes[anchorLink];
                        if (gallerySize == null)
                            return;
                        // There is zero slide.
                        if (nextSlideIndex == gallerySize) {
                            _this.enableGallaryNavigation(anchorLink, Application.LeftNavigationSelector);
                            _this.blockGallaryNavigation(anchorLink, Application.RightNavigationSelector);
                        }
                        else if (nextSlideIndex == 0) {
                            _this.blockGallaryNavigation(anchorLink, Application.LeftNavigationSelector);
                            _this.enableGallaryNavigation(anchorLink, Application.RightNavigationSelector);
                        }
                        else {
                            _this.enableGallaryNavigation(anchorLink, Application.LeftNavigationSelector);
                            _this.enableGallaryNavigation(anchorLink, Application.RightNavigationSelector);
                        }
                    }
                });
            };
            this.blockGallaryNavigation = function (gallaryName, navigationSelector) {
                $('.' + gallaryName + ' > ' + navigationSelector).fadeOut(Application.BlockSpeed);
            };
            this.enableGallaryNavigation = function (gallaryName, navigationSelector) {
                $('.' + gallaryName + ' > ' + navigationSelector).fadeIn(Application.BlockSpeed);
            };
            this.settings = new Settings();
            this.onResizeFunctions = new Array();
            this.sizes = {};
            $(this.initialize);
        }
        Application.prototype.setWeddingsGallerySize = function (size) {
            this.setGallarySize(Gallary.Weddings, size);
        };
        Application.prototype.setFashionGallarySize = function (size) {
            this.setGallarySize(Gallary.Fashion, size);
        };
        Application.prototype.setCommercialGallerySize = function (size) {
            this.setGallarySize(Gallary.Commercial, size);
        };
        return Application;
    }());
    Application.BlockSpeed = 150;
    Application.navigationSelector = '.navigation';
    Application.LeftNavigationSelector = '.left' + Application.navigationSelector;
    Application.RightNavigationSelector = '.right' + Application.navigationSelector;
    Tenter.Application = Application;
})(Tenter || (Tenter = {}));
var Application = new Tenter.Application();
