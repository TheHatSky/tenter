const $ = require("./vendor/jquery.js");
import "./vendor/evil-icons.js";
import "./vendor/jquery.fullPage.js";
import "./vendor/jquery.slimscroll.min.js";
import "./vendor/jquery.easings.min.js";

import { Settings } from "./Settings";
import { Orientation, Device } from "./Device";

type Gallery = "weddings" | "fashion" | "commercial";

type ResizeFunc = () => void;

class Application {
	public settings: Settings;

	private sizes: { [gallery: string] : number };

	private static BlockSpeed = 150;
	private static navigationSelector = '.navigation';
	private static LeftNavigationSelector = '.left' + Application.navigationSelector;
	private static RightNavigationSelector = '.right' + Application.navigationSelector;

	constructor() {
		this.settings = new Settings();
		this.sizes = {
			"weddings": 14,
			"fashion": 14,
			"commercial": 14
		};

		this.onOrientationChange();
		$(this.initialize);

		for(let name of ["eCOph24", "2SSDovb", "NNgTqg1"])
		{
			const img = new Image();
			img.src = `./images/${name}${this.settings.device.thumbnail}.jpg`;
		}
		
		$('[data-image-name]').toArray().forEach((element, index) => {
			var elem = $(element);
			var imageName = elem.data('image-name');
			//elem.css('background-image', 'url(/images/' + this.settings.device.imageFolder + '/' + imageName + ')');
			//elem.css('background-image', `url(https://i.imgur.com/${imageName}${this.settings.device.imgurThumbnail}.jpg)`);
			const imgL = new Image();
			imgL.src = `images/${imageName}${this.settings.device.thumbnail}.jpg`;
		});

		this.onScreenSizeChange();
	}

	private updateGallaryBackgroudSize = (sizeChanged: boolean) => {
		if (this.settings.orientation == Orientation.Portrait)
			$('.portrait').css('background-size', 'cover');
		else
			$('.portrait').css('background-size', 'contain');

		if (sizeChanged){
			$('[data-image-name]').toArray().forEach((element, index) => {
				var elem = $(element);
				var imageName = elem.data('image-name');
				//elem.css('background-image', 'url(/images/' + this.settings.device.imageFolder + '/' + imageName + ')');
				//elem.css('background-image', `url(https://i.imgur.com/${imageName}${this.settings.device.imgurThumbnail}.jpg)`);
				elem.css('background-image', `url(images/${imageName}${this.settings.device.thumbnail}.jpg)`);
			});
			
			for (let key in this.sizes) {
				const size = this.sizes[key];
				
				const width = this.settings.screenWidth / (size + 1);
				
				$('.case.' + key)
					.find('.fp-slidesNav > ul > li > a > span')
					.css('width', width + 'px')
					.css('left', 0);
					
				$('.case.' + key)
					.find('.fp-slidesNav ul li')
					.css('width', width + 'px')
			}
		}
	};

	private updateIconsSize = () => {
		$('.container').find('.icon--s, .icon--m, .icon--l').each((index, element) => {
			$(element)
				.removeClass('icon--s')
				.removeClass('icon--m')
				.removeClass('icon--l')
				.addClass('icon--' + this.settings.device.iconSize);
		});
	}

	private prepareIconsSize = () => {
		$('.container').find('[data-size]').each((index, element) => {
			$(element).attr('data-size', this.settings.device.iconSize);
		});
	}

	private checkResize = () => {
		var newSettings = new Settings();
		
		var widhtChanged = newSettings.screenWidth != this.settings.screenWidth;
		var heightChanged = newSettings.screenHeight != this.settings.screenHeight;

		return widhtChanged || heightChanged;           
	}
	
	private resizeWatcher = () => {
		setTimeout(() => {
			if(this.checkResize())
				$(window).trigger('resize');
			this.resizeWatcher();
		}, 200);
	}
	
	private infoHandler = () => {
		$(document).on('click', '.open', () => {
			$('.close').removeClass('hidden').show();
			$('.open').hide();
			$('.description').fadeIn(300);
		});

		$(document).on('click', '.close', () => {
			$('.close').hide();
			$('.open').show();
			$('.description').fadeOut(300);
		});
	}
	
	private isOnscreen = function(el: HTMLElement) {
		return !(
			(el.offsetLeft + el.offsetWidth) < 0 
			|| (el.offsetTop + el.offsetHeight) < 0
			|| (el.offsetLeft > window.innerWidth || el.offsetTop > window.innerHeight)
		);
	};
	
	private setInfoVisibility = () => {
		var isBackground = $('section.active .fp-slidesNav')
			.find('li a')
			.first()
			.hasClass('active');

		if (isBackground)
			$('.bottom.layout-menu').fadeOut(300);
		else
			$('.bottom.layout-menu').fadeIn(300);
	}

	private onScreenSizeChange() {
		var idToBeRemoved = 'mobile_device';
		var idToBeShown = 'other_device';

		if (this.settings.device == Device.Mobile) {
			idToBeRemoved = 'other_device';
			idToBeShown = 'mobile_device';
		}

		document.getElementById(idToBeRemoved).className = "none";
		document.getElementById(idToBeShown).className = "";
	}

	private onOrientationChange() {
		let idToBeRemoved = "portrait_contacts";
		let idToBeShown = "landscape_contacts";

		if (this.settings.orientation == Orientation.Portrait) {
			idToBeRemoved = "landscape_contacts";
			idToBeShown = "portrait_contacts";
		}

		document.getElementById(idToBeRemoved).className = "none";
		document.getElementById(idToBeShown).className = "";

		document
			.getElementById('contacts-container')
			.className = 'container ' + this.settings.device.name
	}

	private initialize = () => {
		$(window).resize(
			() => {
				var oldDevice = this.settings.device;
				this.settings = new Settings();
				
				var isDeviceChanged = oldDevice != this.settings.device; 
				
				setTimeout(() => {
					this.updateGallaryBackgroudSize(isDeviceChanged);
					this.updateIconsSize();
					this.onScreenSizeChange();
					this.onOrientationChange();
				}, 0);
			});
			
		this.resizeWatcher();

		this.updateGallaryBackgroudSize(true);
		this.prepareIconsSize();
		this.infoHandler();
		
		setTimeout(function() {
			$('.loader').fadeOut(1000);
		}, 1000);
		/*
		$('#fullpage').fullpage({
			sectionSelector: 'section',
			anchors: ['', 'contacts', "weddings", "fashion", "commercial"],
			slidesNavPosition: 'bottom',
			slidesNavigation: true,
			menu: '#menu',
			animateAnchor: false,
			controlArrows: false,
			loopHorizontal: false,
			afterRender: () => {
				$(Application.LeftNavigationSelector)
					.hide()
					.on('click', () => $.fn.fullpage.moveSlideLeft());

				$(Application.RightNavigationSelector)
					.on('click', () => $.fn.fullpage.moveSlideRight());

				this.updateGallaryBackgroudSize(true);
				this.prepareIconsSize();
				this.infoHandler();
				
				setTimeout(function() {
					$('.loader').fadeOut(1000);
				}, 1000);
			},
			afterSlideLoad: () => this.setInfoVisibility(),
			afterLoad: () => this.setInfoVisibility(),
			onLeave: (index, nextIndex, direction) => {
				if (nextIndex != 1) {
					$('#menu').removeClass('faded');
				}
				else {
					$('#menu').addClass('faded');
				}
			},
			onSlideLeave: (anchorLink, index, slideIndex, direction, nextSlideIndex) => {
				var gallerySize = this.sizes[anchorLink];
				if (gallerySize == null)
					return;

				// There is zero slide.
				if (nextSlideIndex == gallerySize) {
					this.enableGallaryNavigation(anchorLink, Application.LeftNavigationSelector);
					this.blockGallaryNavigation(anchorLink, Application.RightNavigationSelector);
				}
				else if (nextSlideIndex == 0) {
					this.blockGallaryNavigation(anchorLink, Application.LeftNavigationSelector);
					this.enableGallaryNavigation(anchorLink, Application.RightNavigationSelector);
				} else {
					this.enableGallaryNavigation(anchorLink, Application.LeftNavigationSelector);
					this.enableGallaryNavigation(anchorLink, Application.RightNavigationSelector);
				}
			}
		});
		*/
	}

	private blockGallaryNavigation = (gallaryName: string, navigationSelector: string) => {
		$('.' + gallaryName + ' > ' + navigationSelector).fadeOut(Application.BlockSpeed);
	}

	private enableGallaryNavigation = (gallaryName: string, navigationSelector: string) => {
		$('.' + gallaryName + ' > ' + navigationSelector).fadeIn(Application.BlockSpeed);
	}
}

window['Application'] = new Application();
