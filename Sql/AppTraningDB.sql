
GO
/****** Object:  Schema [App]    Script Date: 04/20/2015 15:44:37 ******/
CREATE SCHEMA [App] AUTHORIZATION [dbo]
GO
/****** Object:  Table [App].[TraningType]    Script Date: 04/20/2015 15:44:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [App].[TraningType](
	[TraningTypeID] [int] NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_TraningType] PRIMARY KEY CLUSTERED 
(
	[TraningTypeID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [App].[TraningResult]    Script Date: 04/20/2015 15:44:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [App].[TraningResult](
	[TraningResultID] [int] IDENTITY(1,1) NOT NULL,
	[TraningID] [int] NOT NULL,
	[PersonID] [int] NOT NULL,
	[StartDate] [datetime] NULL,
	[EndDate] [datetime] NULL,
	[Rating] [int] NULL,
 CONSTRAINT [PK_TraningResult] PRIMARY KEY CLUSTERED 
(
	[TraningResultID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [App].[TraningQuestionResult]    Script Date: 04/20/2015 15:44:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [App].[TraningQuestionResult](
	[TraningQuestionResultID] [int] IDENTITY(1,1) NOT NULL,
	[TraningQuestionID] [int] NOT NULL,
	[PersonID] [int] NOT NULL,
 CONSTRAINT [PK_TraningQuestionResult] PRIMARY KEY CLUSTERED 
(
	[TraningQuestionResultID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [App].[TraningQuestion]    Script Date: 04/20/2015 15:44:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [App].[TraningQuestion](
	[TraningQuestionID] [int] IDENTITY(1,1) NOT NULL,
	[TraningID] [int] NOT NULL,
 CONSTRAINT [PK_TraningQuestion] PRIMARY KEY CLUSTERED 
(
	[TraningQuestionID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [App].[TraningDetail]    Script Date: 04/20/2015 15:44:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [App].[TraningDetail](
	[TraningDetailID] [int] IDENTITY(1,1) NOT NULL,
	[TraningID] [int] NOT NULL,
 CONSTRAINT [PK_TraningDetail] PRIMARY KEY CLUSTERED 
(
	[TraningDetailID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [App].[TraningAvailable]    Script Date: 04/20/2015 15:44:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [App].[TraningAvailable](
	[TraningAvailableID] [int] IDENTITY(1,1) NOT NULL,
	[TraningID] [int] NOT NULL,
	[IsAvailableForAll] [bit] NOT NULL,
	[ProfileGroupID] [int] NULL,
 CONSTRAINT [PK_TraningAvailable] PRIMARY KEY CLUSTERED 
(
	[TraningAvailableID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [App].[Traning]    Script Date: 04/20/2015 15:44:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [App].[Traning](
	[TraningID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[Description] [nvarchar](max) NULL,
	[IsActive] [bit] NOT NULL,
	[TraningTypeID] [int] NOT NULL,
	[CreateDate] [datetime] NULL,
	[CreateUserID] [int] NULL,
	[IsDeleted] [bit] NOT NULL,
	[DeletedDate] [datetime] NULL,
	[DeletedUserID] [int] NULL,
	[OrganizationID] [int] NULL,
 CONSTRAINT [PK_Traning] PRIMARY KEY CLUSTERED 
(
	[TraningID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [App].[Status]    Script Date: 04/20/2015 15:44:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [App].[Status](
	[StatusID] [int] NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
 CONSTRAINT [PK_Status] PRIMARY KEY CLUSTERED 
(
	[StatusID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [App].[ProfileGroup2Person]    Script Date: 04/20/2015 15:44:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [App].[ProfileGroup2Person](
	[ProfileGroup2PersonID] [int] IDENTITY(1,1) NOT NULL,
	[PersonID] [int] NOT NULL,
	[ProfileGroupID] [int] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
	[DeletedDate] [datetime] NULL,
	[DeletedUserID] [int] NULL,
 CONSTRAINT [PK_ProfileGroup2Person] PRIMARY KEY CLUSTERED 
(
	[ProfileGroup2PersonID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [App].[ProfileGroup]    Script Date: 04/20/2015 15:44:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [App].[ProfileGroup](
	[ProfileGroupID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](200) NOT NULL,
	[CreateDate] [datetime] NULL,
	[CreateUserID] [int] NULL,
	[IsDeleted] [bit] NOT NULL,
	[DeletedDate] [datetime] NULL,
	[DeletedUserID] [int] NULL,
 CONSTRAINT [PK_ProfileGroup] PRIMARY KEY CLUSTERED 
(
	[ProfileGroupID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [App].[Profile]    Script Date: 04/20/2015 15:44:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [App].[Profile](
	[ProfileID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](200) NOT NULL,
	[CreateDate] [datetime] NULL,
	[CreateUserID] [int] NULL,
 CONSTRAINT [PK_Profile_1] PRIMARY KEY CLUSTERED 
(
	[ProfileID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [App].[Person]    Script Date: 04/20/2015 15:44:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [App].[Person](
	[PersonID] [int] IDENTITY(1,1) NOT NULL,
	[ProfileID] [int] NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Mail] [nvarchar](200) NOT NULL,
	[Login] [nvarchar](50) NOT NULL,
	[Password] [nvarchar](50) NOT NULL,
	[StatusID] [int] NOT NULL,
	[RegistrationDate] [datetime] NOT NULL,
	[RegistrationUserID] [int] NOT NULL,
	[LastActivationDate] [datetime] NULL,
	[OrganizationID] [int] NULL,
	[IsDeleted] [bit] NOT NULL,
	[DeletedDate] [datetime] NULL,
	[DeletedUserID] [int] NULL,
 CONSTRAINT [PK_Person_1] PRIMARY KEY CLUSTERED 
(
	[PersonID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [App].[Organization]    Script Date: 04/20/2015 15:44:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [App].[Organization](
	[OrganizationID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](200) NOT NULL,
	[SpaceDisk] [decimal](6, 4) NULL,
	[MaxAssignedUsers] [int] NOT NULL,
	[IsGlobalAvailable] [bit] NOT NULL,
	[IsTraningAvailableForAll] [bit] NOT NULL,
	[CanUserChangeMail] [bit] NOT NULL,
	[CanUserChangeName] [bit] NOT NULL,
	[PatronID] [int] NULL,
	[StatusID] [int] NULL,
	[CreateDate] [datetime] NULL,
	[CreateUserID] [int] NULL,
	[IsDeleted] [bit] NOT NULL,
	[DeletedDate] [datetime] NULL,
	[DeletedUserID] [int] NULL,
 CONSTRAINT [PK_Organization_1] PRIMARY KEY CLUSTERED 
(
	[OrganizationID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [App].[GlobalSetting]    Script Date: 04/20/2015 15:44:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [App].[GlobalSetting](
	[GlobalSettingID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Value] [nvarchar](50) NOT NULL,
	[ModifiedDate] [datetime] NULL,
	[MofifiedUserID] [int] NULL,
 CONSTRAINT [PK_GlobalSetting] PRIMARY KEY CLUSTERED 
(
	[GlobalSettingID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [App].[AppLog]    Script Date: 04/20/2015 15:44:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [App].[AppLog](
	[AppLogID] [int] IDENTITY(1,1) NOT NULL,
	[OperationType] [nvarchar](200) NOT NULL,
	[TraningID] [int] NULL,
	[PersonID] [int] NULL,
	[ModifiedDate] [datetime] NULL,
	[ModifiedUserID] [int] NULL,
 CONSTRAINT [PK_AppLog] PRIMARY KEY CLUSTERED 
(
	[AppLogID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Default [DF_Organization_IsDeleted]    Script Date: 04/20/2015 15:44:37 ******/
ALTER TABLE [App].[Organization] ADD  CONSTRAINT [DF_Organization_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
GO
/****** Object:  Default [DF_Person_IsDeleted]    Script Date: 04/20/2015 15:44:37 ******/
ALTER TABLE [App].[Person] ADD  CONSTRAINT [DF_Person_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
GO
/****** Object:  Default [DF_ProfileGroup_IsDeleted]    Script Date: 04/20/2015 15:44:37 ******/
ALTER TABLE [App].[ProfileGroup] ADD  CONSTRAINT [DF_ProfileGroup_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
GO
/****** Object:  Default [DF_ProfileGroup2Person_IsDeleted]    Script Date: 04/20/2015 15:44:37 ******/
ALTER TABLE [App].[ProfileGroup2Person] ADD  CONSTRAINT [DF_ProfileGroup2Person_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
GO
/****** Object:  Default [DF_Traning_IsActive]    Script Date: 04/20/2015 15:44:37 ******/
ALTER TABLE [App].[Traning] ADD  CONSTRAINT [DF_Traning_IsActive]  DEFAULT ((0)) FOR [IsActive]
GO
/****** Object:  Default [DF_Traning_IsDeleted]    Script Date: 04/20/2015 15:44:37 ******/
ALTER TABLE [App].[Traning] ADD  CONSTRAINT [DF_Traning_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
GO
/****** Object:  Default [DF_TraningAvailable_IsAvailableForAll]    Script Date: 04/20/2015 15:44:37 ******/
ALTER TABLE [App].[TraningAvailable] ADD  CONSTRAINT [DF_TraningAvailable_IsAvailableForAll]  DEFAULT ((1)) FOR [IsAvailableForAll]
GO
