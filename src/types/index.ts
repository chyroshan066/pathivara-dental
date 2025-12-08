interface Name {
    name: string;
}

export interface Href {
    href: string;
}

interface ImgSrc {
    imgSrc: string;
}

interface Id {
    id: number;
}

interface Text {
    text: string;
}

interface Alt {
    alt: string;
}

export interface ClassName {
    className: string;
}

export interface IconType {
    ionIconName: string;
    ionIconLink: string;
}

export interface MediaDetails {
    src: string;
    title: string;
}

export interface Services extends Name, ImgSrc, Text, Href {
    id?: number;
    idStr: string;
}

export interface DentistType extends Name, ImgSrc {
    ionIcon?: IconType[];
    position: string;
}

export interface NavLink extends Name, Href {}
export interface SocialLinkType extends NavLink, ClassName {}

export interface Testimonial extends Name, Id, Text {
    rating: number;
    image: string;
    position?: string;
}

export interface Photo extends Id, MediaDetails, Alt {}

export interface MediaItem extends Id, MediaDetails, Alt {
  type: 'image' | 'video';
  poster?: string; // Optional thumbnail for videos
}

export interface Contact extends Href {
    ionIcon: string;
    textNumber: string;
}