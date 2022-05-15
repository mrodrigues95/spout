import { Meta } from '@storybook/react';
import {
  faBicycle,
  faCar,
  faPlane,
  faWalking,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Timeline } from './timeline';

export default {
  component: Timeline,
  title: 'Timeline',
} as Meta;

export const Basic = () => (
  <Timeline>
    <Timeline.Item>
      <Timeline.Separator>
        <Timeline.Dot />
        <Timeline.Connector />
      </Timeline.Separator>
      <Timeline.Content>Drive</Timeline.Content>
    </Timeline.Item>
    <Timeline.Item>
      <Timeline.Separator>
        <Timeline.Dot />
        <Timeline.Connector />
      </Timeline.Separator>
      <Timeline.Content>Walk</Timeline.Content>
    </Timeline.Item>
    <Timeline.Item>
      <Timeline.Separator>
        <Timeline.Dot />
        <Timeline.Connector />
      </Timeline.Separator>
      <Timeline.Content>Fly</Timeline.Content>
    </Timeline.Item>
    <Timeline.Item>
      <Timeline.Separator>
        <Timeline.Dot />
        <Timeline.Connector />
      </Timeline.Separator>
      <Timeline.Content>Bike</Timeline.Content>
    </Timeline.Item>
  </Timeline>
);
Basic.args = {};

export const Icons = () => (
  <Timeline>
    <Timeline.Item>
      <Timeline.Separator>
        <Timeline.Dot>
          <FontAwesomeIcon icon={faCar} className="h-4 w-4" />
        </Timeline.Dot>
        <Timeline.Connector />
      </Timeline.Separator>
      <Timeline.Content className="py-1">Drive</Timeline.Content>
    </Timeline.Item>
    <Timeline.Item>
      <Timeline.Separator>
        <Timeline.Dot className="bg-indigo-400">
          <FontAwesomeIcon icon={faWalking} className="h-4 w-4 text-white" />
        </Timeline.Dot>
        <Timeline.Connector />
      </Timeline.Separator>
      <Timeline.Content className="py-1">Walk</Timeline.Content>
    </Timeline.Item>
    <Timeline.Item>
      <Timeline.Separator>
        <Timeline.Dot className="border-2 border-solid border-red-500 bg-white">
          <FontAwesomeIcon icon={faPlane} className="h-4 w-4 text-gray-900" />
        </Timeline.Dot>
        <Timeline.Connector />
      </Timeline.Separator>
      <Timeline.Content className="py-1">Fly</Timeline.Content>
    </Timeline.Item>
    <Timeline.Item>
      <Timeline.Separator>
        <Timeline.Dot className="bg-green-200">
          <FontAwesomeIcon
            icon={faBicycle}
            className="h-4 w-4 text-green-700"
          />
        </Timeline.Dot>
        <Timeline.Connector />
      </Timeline.Separator>
      <Timeline.Content className="py-1">Bike</Timeline.Content>
    </Timeline.Item>
  </Timeline>
);
Icons.args = {};
