import React, { useState } from 'react';
import { TNode } from 'react-native-render-html';
import PlaygroundStoreProvider, {
  PlaygroundInitParams
} from './playgroundStore';
import Sheet, { SheetProps } from './Sheet';
import PlaygroundDisplay from './PlaygroundDisplay';
import CardColorRolesProvider from '../../croles/CardColorRolesProvider';

export interface PlaygroundTemplateProps<Sk extends string>
  extends PlaygroundInitParams<Sk> {
  children: SheetProps['children'];
}

export default function PlaygroundTemplate<Sk extends string>({
  children,
  ...storeInitParams
}: PlaygroundTemplateProps<Sk>) {
  const [ttree, setTtree] = useState<TNode>();
  return (
    <>
      <PlaygroundStoreProvider {...storeInitParams}>
        <PlaygroundDisplay onTTreeChange={setTtree} />
        <CardColorRolesProvider>
          <Sheet ttree={ttree}>{children}</Sheet>
        </CardColorRolesProvider>
      </PlaygroundStoreProvider>
    </>
  );
}
