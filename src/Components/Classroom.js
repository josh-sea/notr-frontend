import React from 'react';
import { CollapsibleItem, Collapsible, Button } from 'react-materialize';
import { Accordion } from 'semantic-ui-react'



const Classroom = ({notes, classroom, click}) => {

  return (
  <Accordion
  defaultActiveIndex={0} panels={rootPanels}
  styled
  />
)
}
export default Classroom;
