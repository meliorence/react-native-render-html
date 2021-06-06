import React from 'react';
import classes from './ListsShowcase.module.scss';
import lowerAlpha from '@site/static/img/lists/lower-alpha.png';
import lowerGreek from '@site/static/img/lists/lower-greek.png';
import lowerRoman from '@site/static/img/lists/lower-roman.png';
import rtlArabic from '@site/static/img/lists/rtl-arabic.png';
import rtlBullet from '@site/static/img/lists/rtl-bullet.png';
import thai from '@site/static/img/lists/thai.png';
import russian from '@site/static/img/lists/russian.png';
import circle from '@site/static/img/lists/circle.png';
import disc from '@site/static/img/lists/disc.png';
import disclosureOpen from '@site/static/img/lists/disclosure-open.png';
import disclosureClosed from '@site/static/img/lists/disclosure-closed.png';
import square from '@site/static/img/lists/square.png';
import clsx from 'clsx';

function ListItem({
  src,
  caption,
  rtl,
  id
}: {
  src: string;
  caption: string;
  rtl: boolean;
  id: string;
}) {
  return (
    <figure
      className={clsx(
        classes.item,
        classes[`item--${id}`],
        rtl && classes['item--rtl']
      )}>
      <img src={src} />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

export default function ListsShowcase() {
  return (
    <div className={classes.grid}>
      <ListItem
        id="loweralpha"
        rtl={false}
        caption="Lower Alpha"
        src={lowerAlpha}
      />
      <ListItem
        id="lowergreek"
        rtl={false}
        caption="Lower Greek"
        src={lowerGreek}
      />
      <ListItem
        id="lowerroman"
        rtl={false}
        caption="Lower Roman"
        src={lowerRoman}
      />
      <ListItem id="discrtl" rtl={true} caption="Disc (RTL)" src={rtlBullet} />
      <ListItem
        id="arabicindic"
        rtl={true}
        caption="Arabic Indic (RTL)"
        src={rtlArabic}
      />
      <ListItem id="russian" rtl={false} caption="Russian" src={russian} />
      <ListItem id="circle" rtl={false} caption="Circle" src={circle} />
      <ListItem id="disc" rtl={false} caption="Disc" src={disc} />
      <ListItem id="square" rtl={false} caption="Square" src={square} />
      <ListItem id="thai" rtl={false} caption="Thai" src={thai} />
      <ListItem
        id="disclosureopen"
        rtl={false}
        caption="Disclosure Open"
        src={disclosureOpen}
      />
      <ListItem
        id="disclosureclosed"
        rtl={false}
        caption="Disclosure Closed"
        src={disclosureClosed}
      />
    </div>
  );
}
