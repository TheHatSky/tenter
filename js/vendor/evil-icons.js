/*
 * Evil Icons 1.7.8
 * http://evil-icons.io
 * Licensed under the MIT License: http://www.opensource.org/licenses/mit-license.php
 * Copyright 2014-2015 Alexander Madyankin <alexander@madyankin.name>, Roman Shamin <al4emist.artway@gmail.com>
 */
!function(c){"use strict";function t(c,h){var h=h||{},t=h.size?"icon--"+h.size:"",p="icon icon--"+c+" "+t+" "+(h["class"]||""),l="<svg class='icon__cnt'><use xlink:href='#"+c+"-icon' /></svg>",i="<div class='"+p+"'>"+a(l,p)+"</div>";
return i}function a(c,h){return h.indexOf("spinner")>-1?"<div class='icon__spinner'>"+c+"</div>":c}function p(){for(var h=c.querySelectorAll("[data-icon]"),a=0;a<h.length;a++){var p=h[a],l=p.getAttribute("data-icon"),i={"class":p.className,size:p.getAttribute("data-size")};p.insertAdjacentHTML("beforebegin",t(l,i)),p.parentNode.removeChild(p)}}c.addEventListener("DOMContentLoaded",function(){p()})}(window.document);