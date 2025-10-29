import type { Meta, StoryObj } from '@storybook/react'
import { DynTabs, DynTab, DynTabPanel } from './dyn-tabs'

const meta: Meta<typeof DynTabs> = {
  title: 'Components/DynTabs',
  component: DynTabs,
  parameters: {
    docs: {
      description: {
        component: 'A WAI-ARIA compliant tabs component with keyboard navigation support (Arrow keys, Home, End, Typeahead).'
      }
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'aria-roles',
            enabled: true
          },
          {
            id: 'tabindex',
            enabled: true
          }
        ]
      }
    }
  },
  argTypes: {
    defaultValue: {
      control: { type: 'text' },
      description: 'Default active tab value'
    },
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'Tab orientation'
    },
    'aria-label': {
      control: { type: 'text' },
      description: 'Accessible label for the tab list'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <DynTabs defaultValue="tab1" aria-label="Example tabs">
      <DynTab item={{ key: 'tab1', value: 'tab1', label: 'First Tab' }} />
      <DynTab item={{ key: 'tab2', value: 'tab2', label: 'Second Tab' }} />
      <DynTab item={{ key: 'tab3', value: 'tab3', label: 'Third Tab' }} />
      
      <DynTabPanel item={{ key: 'tab1', value: 'tab1', label: 'First Tab' }}>
        <div style={{ padding: '1rem' }}>
          <h3>First Tab Content</h3>
          <p>This is the content for the first tab. You can put any React components here.</p>
        </div>
      </DynTabPanel>
      
      <DynTabPanel item={{ key: 'tab2', value: 'tab2', label: 'Second Tab' }}>
        <div style={{ padding: '1rem' }}>
          <h3>Second Tab Content</h3>
          <p>This is the content for the second tab with different information.</p>
        </div>
      </DynTabPanel>
      
      <DynTabPanel item={{ key: 'tab3', value: 'tab3', label: 'Third Tab' }}>
        <div style={{ padding: '1rem' }}>
          <h3>Third Tab Content</h3>
          <p>This is the content for the third tab.</p>
        </div>
      </DynTabPanel>
    </DynTabs>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic horizontal tabs with three panels.'
      }
    }
  }
}

export const Vertical: Story = {
  render: () => (
    <DynTabs defaultValue="profile" orientation="vertical" aria-label="Settings tabs">
      <DynTab item={{ key: 'profile', value: 'profile', label: 'Profile' }} />
      <DynTab item={{ key: 'account', value: 'account', label: 'Account' }} />
      <DynTab item={{ key: 'security', value: 'security', label: 'Security' }} />
      <DynTab item={{ key: 'notifications', value: 'notifications', label: 'Notifications' }} />
      
      <DynTabPanel item={{ key: 'profile', value: 'profile', label: 'Profile' }}>
        <div style={{ padding: '1rem' }}>
          <h3>Profile Settings</h3>
          <p>Update your profile information and preferences.</p>
        </div>
      </DynTabPanel>
      
      <DynTabPanel item={{ key: 'account', value: 'account', label: 'Account' }}>
        <div style={{ padding: '1rem' }}>
          <h3>Account Settings</h3>
          <p>Manage your account details and billing information.</p>
        </div>
      </DynTabPanel>
      
      <DynTabPanel item={{ key: 'security', value: 'security', label: 'Security' }}>
        <div style={{ padding: '1rem' }}>
          <h3>Security Settings</h3>
          <p>Configure your security preferences and two-factor authentication.</p>
        </div>
      </DynTabPanel>
      
      <DynTabPanel item={{ key: 'notifications', value: 'notifications', label: 'Notifications' }}>
        <div style={{ padding: '1rem' }}>
          <h3>Notification Settings</h3>
          <p>Choose how and when you want to be notified.</p>
        </div>
      </DynTabPanel>
    </DynTabs>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Vertical tab orientation, commonly used for settings panels.'
      }
    }
  }
}

export const WithIcons: Story = {
  render: () => (
    <DynTabs defaultValue="dashboard" aria-label="Main navigation">
      <DynTab item={{ key: 'dashboard', value: 'dashboard', label: '📊 Dashboard' }} />
      <DynTab item={{ key: 'users', value: 'users', label: '👥 Users' }} />
      <DynTab item={{ key: 'settings', value: 'settings', label: '⚙️ Settings' }} />
      <DynTab item={{ key: 'reports', value: 'reports', label: '📈 Reports' }} />
      
      <DynTabPanel item={{ key: 'dashboard', value: 'dashboard', label: 'Dashboard' }}>
        <div style={{ padding: '1rem' }}>
          <h3>Dashboard</h3>
          <p>Overview of your application metrics and KPIs.</p>
        </div>
      </DynTabPanel>
      
      <DynTabPanel item={{ key: 'users', value: 'users', label: 'Users' }}>
        <div style={{ padding: '1rem' }}>
          <h3>Users Management</h3>
          <p>Manage user accounts and permissions.</p>
        </div>
      </DynTabPanel>
      
      <DynTabPanel item={{ key: 'settings', value: 'settings', label: 'Settings' }}>
        <div style={{ padding: '1rem' }}>
          <h3>Application Settings</h3>
          <p>Configure application-wide settings and preferences.</p>
        </div>
      </DynTabPanel>
      
      <DynTabPanel item={{ key: 'reports', value: 'reports', label: 'Reports' }}>
        <div style={{ padding: '1rem' }}>
          <h3>Reports & Analytics</h3>
          <p>View detailed reports and analytics data.</p>
        </div>
      </DynTabPanel>
    </DynTabs>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tabs with emoji icons for better visual identification.'
      }
    }
  }
}

export const KeyboardNavigation: Story = {
  render: () => (
    <div style={{ padding: '1rem' }}>
      <div style={{ marginBottom: '1rem', fontSize: '0.875rem', color: '#666' }}>
        <strong>Keyboard Navigation Instructions:</strong>
        <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
          <li>Use <kbd>Tab</kbd> to focus the tab list</li>
          <li>Use <kbd>Arrow Keys</kbd> to navigate between tabs</li>
          <li>Use <kbd>Home</kbd> to go to first tab</li>
          <li>Use <kbd>End</kbd> to go to last tab</li>
          <li>Type letters for typeahead search</li>
          <li>Use <kbd>Enter</kbd> or <kbd>Space</kbd> to activate a tab</li>
        </ul>
      </div>
      
      <DynTabs defaultValue="accessibility" aria-label="Keyboard navigation demo">
        <DynTab item={{ key: 'accessibility', value: 'accessibility', label: 'Accessibility' }} />
        <DynTab item={{ key: 'keyboard', value: 'keyboard', label: 'Keyboard' }} />
        <DynTab item={{ key: 'focus', value: 'focus', label: 'Focus Management' }} />
        <DynTab item={{ key: 'aria', value: 'aria', label: 'ARIA Attributes' }} />
        
        <DynTabPanel item={{ key: 'accessibility', value: 'accessibility', label: 'Accessibility' }}>
          <div style={{ padding: '1rem' }}>
            <h3>Accessibility Features</h3>
            <p>This component follows WAI-ARIA Authoring Practices for tabs.</p>
          </div>
        </DynTabPanel>
        
        <DynTabPanel item={{ key: 'keyboard', value: 'keyboard', label: 'Keyboard' }}>
          <div style={{ padding: '1rem' }}>
            <h3>Keyboard Support</h3>
            <p>Full keyboard navigation with arrow keys, home, end, and typeahead.</p>
          </div>
        </DynTabPanel>
        
        <DynTabPanel item={{ key: 'focus', value: 'focus', label: 'Focus Management' }}>
          <div style={{ padding: '1rem' }}>
            <h3>Focus Management</h3>
            <p>Proper focus indicators and focus trapping within the component.</p>
          </div>
        </DynTabPanel>
        
        <DynTabPanel item={{ key: 'aria', value: 'aria', label: 'ARIA Attributes' }}>
          <div style={{ padding: '1rem' }}>
            <h3>ARIA Attributes</h3>
            <p>Comprehensive ARIA labeling for screen reader compatibility.</p>
          </div>
        </DynTabPanel>
      </DynTabs>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstration of keyboard navigation capabilities and accessibility features.'
      }
    }
  }
}

export const ManyTabs: Story = {
  render: () => {
    const tabs = Array.from({ length: 8 }, (_, i) => ({
      key: `tab${i + 1}`,
      value: `tab${i + 1}`,
      label: `Tab ${i + 1}`
    }))
    
    return (
      <DynTabs defaultValue="tab1" aria-label="Many tabs example">
        {tabs.map((tab) => (
          <DynTab key={tab.key} item={tab} />
        ))}
        
        {tabs.map((tab) => (
          <DynTabPanel key={tab.key} item={tab}>
            <div style={{ padding: '1rem' }}>
              <h3>Content for {tab.label}</h3>
              <p>This is the content panel for {tab.label.toLowerCase()}.</p>
            </div>
          </DynTabPanel>
        ))}
      </DynTabs>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Example with many tabs to test overflow handling and navigation.'
      }
    }
  }
}
