/*
 * Copyright 2022 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import { extendComponent } from '@backstage/core-plugin-api';
import { linkComponentRef } from '@backstage/core-components';

export const linkExtension = extendComponent(linkComponentRef, {
  Provider({ value, Component }) {
    const isGithubUrl = React.useMemo(() => {
      try {
        const host = new URL(value.to).host;
        return host === 'github.com' || host.endsWith('.github.com');
      } catch (err) {
        return false;
      }
    }, [value.to]);

    if (!value.children || !isGithubUrl) return <Component />;

    const children = (
      <>
        {value.children}
        {` (this link goes to GitHub)`}
      </>
    );

    return <Component value={{ ...value, children }} />;
  },
});