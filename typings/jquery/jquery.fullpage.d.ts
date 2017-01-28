interface FullpageSettings {
	//Navigation
	menu?: boolean | string;
	lockAnchors?: boolean;
	anchors?: string[];
	navigation?: boolean;
	navigationPosition?: string;
	navigationTooltips?: string[];
	showActiveTooltip?: boolean;
	slidesNavigation?: boolean;
	slidesNavPosition?: string;

	//Scrolling
	css3?: boolean;
	scrollingSpeed?: number;
	autoScrolling?: boolean;
	fitToSection?: boolean;
	fitToSectionDelay?: number;
	scrollBar?: boolean;
	easing?: string;
	easingcss3?: string;
	loopBottom?: boolean;
	loopTop?: boolean;
	loopHorizontal?: boolean;
	continuousVertical?: boolean;
	normalScrollElements?: string;
	scrollOverflow?: boolean;
	touchSensitivity?: number;
	normalScrollElementTouchThreshold?: number;

	//Accessibility
	keyboardScrolling?: boolean;
	animateAnchor?: boolean;
	recordHistory?: boolean;

	//Design
	controlArrows?: boolean;
	verticalCentered?: boolean;
	resize ?: boolean;
	sectionsColor?: string[];
	paddingTop?: string;
	paddingBottom?: string;
	fixedElements?: string;
	responsiveWidth?: number;
	responsiveHeight?: number;

	//Custom selectors
	sectionSelector?: string;
	slideSelector?: string;

	//events
	onLeave?: (index?: number, nextIndex?: number, direction?: string) => void;
	afterLoad?: (anchorLink?: string, index?: number) => void;
	afterRender?: () => void;
	afterResize?: () => void;
	afterSlideLoad?: (anchorLink?: string, index?: number, slideAnchor?: string, slideIndex?: number | string) => void;
	onSlideLeave?: (anchorLink?: string, index?: number, slideIndex?: number, direction?: string, nextSlideIndex?: number) => void;
}

interface JQuery {
	fullpage: (settings: FullpageSettings) => JQuery;
}
