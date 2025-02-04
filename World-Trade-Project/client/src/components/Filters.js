import React from 'react';
import { Accordion, AccordionItem, AccordionButton, AccordionPanel } from '@chakra-ui/react';

const Filters = ({ onFilterChange }) => {
  const rarities = [
    'Common', 'Uncommon', 'Rare', 'Epic', 'Legendary', 'Mythic', 'Exalted', 'Exotic', 'Transcendent', 'Unique'
  ];

  const categories = [
    { name: 'Armor', tags: ['Armor'] },
    { name: 'Artifacts', tags: ['Weapon', 'Tool', 'Armor'] },
    { name: 'Land', tags: ['Founder', 'Additional'] },
    { name: 'Tools', tags: ['Pickaxe', 'Axe'] },
    { name: 'Weapons', tags: ['Club', 'Claws', 'Sword And Shield', 'Greatsword', 'Greathammer', 'Dual Axes'] }
  ];

  const handleFilterChange = (filterType, filterValue) => {
    onFilterChange(filterType, filterValue);
  };

  return (
    <div className="chakra-slide" style={{ position: 'fixed', left: 0, top: 0, bottom: 0, width: '200px', transform: 'translateX(0%) translateZ(0px)' }}>
      <Accordion allowMultiple>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <span>Rarity</span>
            </AccordionButton>
          </h2>
          <AccordionPanel>
            {rarities.map((rarity) => (
              <div key={rarity} role="region" id={`accordion-panel-${rarity}`} aria-labelledby={`accordion-button-${rarity}`} className="chakra-accordion__panel">
                <button onClick={() => handleFilterChange('rarity', rarity)}>{rarity}</button>
              </div>
            ))}
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <span>Category</span>
            </AccordionButton>
          </h2>
          <AccordionPanel>
            {categories.map((category) => (
              <div key={category.name} role="region" id={`accordion-panel-${category.name}`} aria-labelledby={`accordion-button-${category.name}`} className="chakra-accordion__panel">
                <button onClick={() => handleFilterChange('category', category.name)}>{category.name}</button>
                {category.tags.map((tag) => (
                  <div key={tag} role="region" id={`accordion-panel-${tag}`} aria-labelledby={`accordion-button-${tag}`} className="chakra-accordion__panel">
                    <button onClick={() => handleFilterChange('tag', tag)}>{tag}</button>
                  </div>
                ))}
              </div>
            ))}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Filters;
